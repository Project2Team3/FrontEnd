import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-button',
  templateUrl: './signout-button.component.html',
  styleUrls: ['./signout-button.component.css'],
})
export class SignoutButtonComponent {
  constructor(private appComponent: AppComponent, private router: Router) {}

  signOut(): void {
    this.appComponent.signOut();
    this.router.navigate(['/']);
  }
}
