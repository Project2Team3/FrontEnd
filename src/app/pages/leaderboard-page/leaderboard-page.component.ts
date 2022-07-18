import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/users.service';
import { User } from 'src/app/models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-leaderboard-page',
  templateUrl: './leaderboard-page.component.html',
  styleUrls: ['./leaderboard-page.component.css']
})
export class LeaderboardPageComponent implements OnInit {

  title= "All Users";
  users: User[] =[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
    this.userService.findAllUsers()
    .subscribe(data =>{
      this.users=data;

      this.users.sort(function(a, b) {
        return b.points - a.points;
      });

      this.users= this.users.slice(0,10);
    })
  }
}
