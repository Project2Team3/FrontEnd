import { Component } from '@angular/core';
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

  updateSessionStorage(body: { id: any; username: any; country: any; points: any; email: any; }) {
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: body.id,
        username: body.username,
        country: body.country,
        points: body.points,
        email: body.email,
      })
    );
  }
}
