import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Question } from 'src/app/models/question';
import { OpentdbService } from '../../services/opentdbService/opentdb.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {
  constructor(private appComponent: AppComponent, private router: Router) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }
}
