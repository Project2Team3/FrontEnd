import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

  constructor() { }

  active:string = "login"

  onChange(event: string):void{
    this.active = event
  }

}
