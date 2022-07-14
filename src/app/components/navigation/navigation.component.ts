import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private appComponent: AppComponent, private router: Router) {}

  signOut(): void {
    this.appComponent.signOut();
    this.router.navigate(['/']);
  }
  ngOnInit(): void {
  }

}
