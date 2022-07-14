import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService/users.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }
}

