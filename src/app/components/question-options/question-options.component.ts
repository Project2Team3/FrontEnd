import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-options',
  templateUrl: './question-options.component.html',
  styleUrls: ['./question-options.component.css']
})
export class QuestionOptionsComponent  {

  constructor() { }
  @Input() options:string[] = [];
  @Output() selected:EventEmitter<any> = new EventEmitter<any>();

  onSelect(e: any){
    this.selected.emit(e)
  }

  optionSelected(e:any) {
    this.onSelect(e)
   }
}
