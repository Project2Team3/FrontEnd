import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/userService/users.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginService/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() active: string | undefined;
  @Output() activeChange: EventEmitter<string> = new EventEmitter<string>();

  user: User = new User(0, ``, ``, ``, 0, ``);

  registerText: string = 'REGISTER';
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) {}

  changeToLogin(): void {
    this.activeChange.emit('login');
  }

  registerUser(): void {
    if (
      !this.user.username.trim() ||
      !this.user.password.trim() ||
      !this.user.country.trim() ||
      !this.user.email.trim()
    ) {
      this.registerText = 'FAILED';
      setTimeout(() => (this.registerText = 'REGISTER'), 3000);
      return;
    }

    this.isLoading = true;
    this.userService.findAllUsers().subscribe({
      next:(data)=>{
        let filteredData = data.filter((individualData) => {
          return individualData.email === this.user.email || individualData.username === this.user.username;
        })
        if (filteredData.length > 0) {
          this.registerText = 'FAILED';
          setTimeout(() => (this.registerText = 'REGISTER'), 3000);
          return;
        } else {
          this.userService.registerUser(this.user).subscribe({
            next: () => {
              this.loginService
                .loginUser(this.user.username, this.user.password)
                .subscribe({
                  next: (response) => {
                    this.isLoading = false;
                    const token = response.headers.get('user-token');
                    sessionStorage.setItem('token', token);
                    let body = response.body;
                    sessionStorage.setItem(
                      'user',
                      JSON.stringify({
                        id: body.id,
                        username: body.username,
                        country: body.password,
                        points: body.points,
                        email: body.email,
                      })
                    );
                    this.router.navigate(['/home']);
                  },
                });
            },
            error: () => {
              this.registerText = 'INVALID';
              setTimeout(() => (this.registerText = 'REGISTER'), 3000);
            },
          });

        }
      }
    })

  }
}
