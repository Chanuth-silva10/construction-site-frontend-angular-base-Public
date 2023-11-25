import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpService } from './http.service';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'api/auth/login';
  private userUrl = 'api/employees';
  private user;
  private loginStatusSubject = new Subject<boolean>();
  private userSubject = new Subject<any>();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(
    private httpService:HttpService<any>,
    private cookieService: CookieService,
    private router: Router,
    private feedback: FeedbackService,
  ) { }

  init(): void {
    if (this.isLoggedIn()) {
      this.loggedIn();
    }
  }

  login(credentials: Object): Observable<any> {
    return this.httpService.save(this.loginUrl, credentials);
  }

  loadUserInfo() {
    const tokenData: any = jwtDecode(this.cookieService.get('token'));
    if (tokenData) {
      this.httpService.getById(this.userUrl, tokenData.id).subscribe(data => {
        if (data._id) {
          this.user = data;
          this.userSubject.next(this.user);
        }
      });
    }else{
      this.feedback.error('token not this');
    }
  }

  loggedIn(): void {
    this.loginStatusSubject.next(true);
    this.loadUserInfo();
  }

  isLoggedIn(): boolean {
    const token = this.cookieService.get('token');
    const tokenData: any = token && jwtDecode(token);
    return tokenData && tokenData.id !== null;
  }

  getLoginStatus(): Observable<boolean> {
    return this.loginStatusSubject.asObservable();
  }

  getUserInfo(): Observable<any> {
    return this.userSubject.asObservable();
  }

  getUserObject() {
    return this.user;
  }

  logout(): void {
    this.loginStatusSubject.next(false);
    this.userSubject.next({});
    this.cookieService.delete('token');
    this.router.navigateByUrl('login');
  }

}
