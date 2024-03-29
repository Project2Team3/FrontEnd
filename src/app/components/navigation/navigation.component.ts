import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
  }

  signOut(): void {
    this.appComponent.signOut();
  }
}
