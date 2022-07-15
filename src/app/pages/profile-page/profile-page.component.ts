import { Component, OnInit } from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  constructor() { }
  user:User =new User(0,'','','',0,'');

  ngOnInit(): void {
    console.log(sessionStorage.getItem('token'));
  }
}
