import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {LoginService} from "../../services/loginService/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() active: string | undefined;
  @Output() activeChange:EventEmitter<string> = new EventEmitter<string>()

  user:User = new User(0, ``,``,``,0,``);

  loginText: string = "LOGIN";

  constructor(private loginService: LoginService, private router: Router) {
  }

  changeToRegister():void{
    this.activeChange.emit("register")
  };

  loginUser():void {
    this.loginService.loginUser(this.user.username,this.user.password).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.loginText = "INCORRECT"
        setTimeout(()=> this.loginText = "LOGIN", 3000)
      }
    })
  }
}
