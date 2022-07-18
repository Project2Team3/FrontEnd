import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/userService/users.service";
import {FriendsService} from "../../services/friendService/friends.service";
import {User} from "../../models/user";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  constructor(private userService:UserService, private friendService:FriendsService, private appComponent:AppComponent) { }
  friendsList:User[] = [];
  addFriendsList:User[] = []
  allUsersExceptSelf:User[] = []
  allUsers = new Map();
  existingFriends = new Map();
  selectedFriend:any = {};

  // @ts-ignore
  currentUserString: string = sessionStorage.getItem("user");
  currentUserJSON:any;

  title:string = "Friends";
  friendUsername: string = "";
  active: string = 'list';


  ngOnInit(): void {
    if (!sessionStorage.getItem("user")) {
      this.appComponent.signOut();
      return;
    }
    this.currentUserJSON = JSON.parse(this.currentUserString)
    this.friendService.findFriendsById(this.currentUserJSON.id).subscribe({
      next:result => {
        for (let user of result){
          this.friendsList.push(user)
          this.existingFriends.set(user.username, user)
        }
        this.friendsList.slice(0,8)
        this.existingFriends.set(this.currentUserJSON.username, this.currentUserJSON)
        this.userService.findAllUsers().subscribe({
          next: value => {
            let allUsers = value;
            for (let user of allUsers) {
              this.allUsers.set(user.username, user)
            }
            this.allUsersExceptSelf = allUsers.filter(user => {
              return user.id != this.currentUserJSON.id;
            })
            this.addFriendsList = allUsers.filter(user => {
              return !this.existingFriends.get(user.username);
            }).slice(0,8)
            this.filterFriendsList()
          },
          error: err => console.log(err)
        });
      }
    })
  }

  changeTitle() {
    if (this.title === "Friends") {
      this.title = "Add Friends"
      this.friendUsername = "";
      this.filterAddFriendsList()
    } else {
      this.title = "Friends"
      this.friendUsername = "";
      this.filterFriendsList()
    }
  }

  addFriend(event:any) {
    let friend = this.addFriendsList.filter((user) => {
      return user.username === event.target.outerText;
    })[0]

    this.friendService.addFriendByCurrentUserIdAndFriendId(this.currentUserJSON.id, friend.id).subscribe({
      next:(message) => {
        console.log(message)
      },
    }).add(()=>{
      window.location.reload()
    });

  }

  filterAddFriendsList() {
    this.addFriendsList = this.allUsersExceptSelf.filter((data => {
      return data.username.toLowerCase().includes(this.friendUsername.toLowerCase()) && !this.existingFriends.get(data.username);
    })).slice(0,8)
  }

  moreInfo(event: any) {
    this.active = 'info'
    this.selectedFriend = this.existingFriends.get(event.target.outerText);
  }

  filterFriendsList() {
    this.friendsList = this.allUsersExceptSelf.filter((data => {
      return data.username.toLowerCase().includes(this.friendUsername.toLowerCase()) && this.existingFriends.get(data.username);
    })).slice(0,8)
  }

  onBack() {
    this.active = 'list'
  }
}
