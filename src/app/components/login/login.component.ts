import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { LoginService } from '../../services/loginService/login.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Input() active: string | undefined;
  @Output() activeChange: EventEmitter<string> = new EventEmitter<string>();

  user: User = new User(0, ``, ``, ``, 0, ``);

  loginText: string = 'LOGIN';
  isLoading: boolean = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private appComponent:AppComponent
  ) {}

  changeToRegister(): void {
    this.activeChange.emit('register');
  }

  loginUser(): void {
    if (!this.user.username.trim() || !this.user.password.trim()) {
      this.loginText = 'FAILED';
      setTimeout(() => (this.loginText = 'LOGIN'), 3000);
      return;
    }

    this.isLoading = true;

    this.loginService
      .loginUser(this.user.username, this.user.password)
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          const token = response.headers.get('user-token');

          sessionStorage.setItem('token', token);

          let body = response.body;

          this.appComponent.updateSessionStorage(body);

          this.router.navigate(['/home']);
        },
        error: () => {
          this.isLoading = false;
          this.loginText = 'FAILED';
          setTimeout(() => (this.loginText = 'LOGIN'), 3000);
        },
      });
  }
}
