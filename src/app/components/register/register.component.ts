import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/userService/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{

  @Input() active: string | undefined;
  @Output() activeChange:EventEmitter<string> = new EventEmitter<string>()

  user:User = new User(0, ``,``,``,0,``);

  registerText: string = "REGISTER"

  constructor(private userService:UserService, private router: Router) { }

  changeToLogin():void {
    this.activeChange.emit("login");
  };
  registerUser():void {
    this.userService.registerUser(this.user).subscribe({
      next: () => this.router.navigate(['/homePage']),
      error: () => {
        this.registerText = "INVALID"
        setTimeout(() => this.registerText = "REGISTER", 3000)
      }
    })
  }

}
