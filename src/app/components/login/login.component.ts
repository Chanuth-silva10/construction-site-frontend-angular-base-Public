import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPass = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private feedback: FeedbackService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (this.loginForm.valid) {
      this.loading = true;

      const credentials = {
        email: this.email?.value,
        password: this.password?.value,
        type: 'user'
      }

      this.authService.login(credentials).subscribe(
        data => {
          if (data.token) {
            this.cookieService.set('token', data.token);
            this.authService.loggedIn();
            this.router.navigateByUrl('/items');
          } else {
            this.feedback.error(data.msg);
          }
        },
        error => {
          if (error.status === 404) {
            this.feedback.error("Email is not registered");
          } else if (error.status === 401) {
            this.feedback.error("Password is incorrect");
          } else {
            this.feedback.error("Something went wrong, please try again...");
          }
        }
      ).add(() => this.loading = false);
    }
  }

}
