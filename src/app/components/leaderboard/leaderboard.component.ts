import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css'],
})
export class LeaderboardComponent implements OnInit {
  title = 'All Users';
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.findAllUsers().subscribe((data) => {
      this.users = data;

      this.users.sort(function (a, b) {
        return b.points - a.points;
      });
      console.log(this.users);
    });
    this.users = this.users.slice(0, 3);
  }
}
