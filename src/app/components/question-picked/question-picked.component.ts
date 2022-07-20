import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-picked',
  templateUrl: './question-picked.component.html',
  styleUrls: ['./question-picked.component.css'],
})
export class QuestionPickedComponent {
  constructor() {}

  @Input() status: string = '';
  @Input() answer: string = '';
  @Input() yourAnswer: string = '';
  @Input() color: string = '';
}
