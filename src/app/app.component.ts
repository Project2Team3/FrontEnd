import { Component } from '@angular/core';
import { User } from './models/user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router:Router) {
  }

  title: string = 'TriviApp';

  signOut(): void {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('user', '');
    this.router.navigate(['/'])
  }
}
