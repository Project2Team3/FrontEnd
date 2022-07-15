import { Component, OnInit } from '@angular/core';
<<<<<<< Updated upstream
=======
import { AppComponent } from '../../app.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
<<<<<<< Updated upstream

  constructor() { }

  ngOnInit(): void {
=======
  constructor(private appComponent: AppComponent) {}

  signOut(): void {
    this.appComponent.signOut();
>>>>>>> Stashed changes
  }
  ngOnInit(): void {}
}
