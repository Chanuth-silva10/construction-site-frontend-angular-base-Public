import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
//Main component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn!: boolean;
  loginStatusSubscription: Subscription;
  title = 'Frontend';

  constructor(private router: Router, private authService: AuthService) {
    this.authService.init();
    this.loginStatusSubscription = this.authService.getLoginStatus()
      .subscribe(loginStatus => {this.loggedIn = loginStatus})
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigateByUrl('login');
    } else {
      this.loggedIn = true;
    }
  }

}
