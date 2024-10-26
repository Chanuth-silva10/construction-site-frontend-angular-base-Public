import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../components/users/user.model';
import {HttpService} from "../http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/employees';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(private http: HttpClient, private httpService:HttpService<User>) { }

  getAllUsers(): Observable<User[]> {
    return this.httpService.getAll(this.apiUrl);
  }

  saveUser(data: Object): Observable<User> {
    return this.httpService.save(this.apiUrl,data);
  }

  getUserById(id: any): Observable<User> {
    return this.httpService.getById(this.apiUrl,id);
  }

  updateUser(id: string, data:Object): Observable<User> {
    return this.httpService.update(this.apiUrl,id,data);
  }

  getAllSiteManagers(): Observable<User[]> {
    return this.httpService.getAll(this.apiUrl+"/type/site_manager");
  }
  changePassword(id: string, data: Object): Observable<any> {
    return this.httpService.update(`${this.apiUrl}/change-password`, id, data)
  }

  deleteUser(id: string): Observable<User> {
    return this.httpService.delete(this.apiUrl,id);
  }

}
