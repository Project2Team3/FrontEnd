import { AppComponent } from './../../app.component';
import { UserService } from 'src/app/services/userService/users.service';
import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor(private userService:UserService, private appComponent:AppComponent){


  }
  //user:User[] = new User[];

 user:User =new User(0,'','','',0,'');
 userString:string | null = sessionStorage.getItem("user");


  ngOnInit() :void{
    if (!sessionStorage.getItem("user")) {
      this.appComponent.signOut();
      return;
    }

    let userJSON = {id:0};
    if (this.userString) {
      userJSON = JSON.parse(this.userString);
    }
    console.log(userJSON);

    this.userService.findUserById(userJSON.id).subscribe({
      next:(data)=>{
        this.user = data;
        console.log(this.user);
      }
    })

    // this.user= sessionStorage.getItem('user');

   // this.user = JSON.parse(localStorage.getItem('user')!);
  }
}
