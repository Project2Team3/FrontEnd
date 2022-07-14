import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-button',
  templateUrl: './home-button.component.html',
  styleUrls: ['./home-button.component.css'],
})
export class HomeButtonComponent {
  constructor(private appComponent: AppComponent, private router: Router) {}

  goHome(): void {
    window.location.reload();
    this.router.navigate(['/home']);
  }
}
