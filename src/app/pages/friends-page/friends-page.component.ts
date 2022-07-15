import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/userService/users.service";
import {FriendsService} from "../../services/friendService/friends.service";
import {User} from "../../models/user";
import {logMessages} from "@angular-devkit/build-angular/src/builders/browser-esbuild/esbuild";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  constructor(private userService:UserService, private friendService:FriendsService, private appComponent:AppComponent) { }
  allUsers:User[] = [];
  filteredUsers:User[] = [];
  // @ts-ignore
  currentUserString: string = sessionStorage.getItem("user");


  title:string = "Friends";


  ngOnInit(): void {
    if (!sessionStorage.getItem("user")) {
      this.appComponent.signOut();
      return;
    }
    let currentUserUsername = JSON.parse(this.currentUserString).username;
    console.log(currentUserUsername)
    this.userService.findAllUsers().subscribe({
      next: value => {
        this.allUsers = value;
        this.filteredUsers = this.allUsers.filter(user => {
          return user.username != currentUserUsername;
        })
      },
      error: err => console.log(err)
    });
  }


  changeTitle() {
    if (this.title === "Friends") {
      this.title = "Add Friend"
    } else {
      this.title = "Friends"
    }
  }
}
