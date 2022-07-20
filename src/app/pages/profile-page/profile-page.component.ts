import { LoginService } from './../../services/loginService/login.service';
import { AppComponent } from './../../app.component';
import { UserService } from 'src/app/services/userService/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent implements OnInit {


 user:User =new User(0,'','','',0,'');
 userString:string | null = sessionStorage.getItem("user");
 notif:string = 'Error';
  active:string = "title"

  constructor(
    private userService: UserService,
    private appComponent: AppComponent,
    private router:Router
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('user')) {
this.appComponent.signOut();
      return;
    }
    let userJSON = { id: 0 };
    if (this.userString) {
      userJSON = JSON.parse(this.userString);
    }
    this.userService.findUserById(userJSON.id).subscribe({
      next: (data) => {
        this.user = data;
        console.log(this.user);
      }
    })
  }
  onChangePasswordListItemClick() {
    this.active = this.active === "form" ? "title" : "form";
  }
  changePassword(event:any):void{

    event.stopPropagation();

    if(this.user.password.trim().length==0){
      this.notif = 'INVALID';
      setTimeout(() => (this.notif = 'Changed'), 3000);
      return;
  }
    this.userService.updateUser(this.user).subscribe({
      next: () => {
      }
    })
    this.router.navigate(['/home']);

  }
 
 
  passwordInput(event: any) {
    event.stopPropagation()
  }
  onChangeButtonClicked(event: any) {
    event.stopPropagation()
  }
}
