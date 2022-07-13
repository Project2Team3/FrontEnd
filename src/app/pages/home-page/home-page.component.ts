import {Component, Input, ViewEncapsulation} from '@angular/core';
import { Question } from 'src/app/models/question';
import {OpentdbService} from "../../services/opentdbService/opentdb.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent {

  // constructor(private opentdbService:OpentdbService, private router:Router) {}
  //
  // questions:Question[] = Question.questions;
  //
  // amount:number = 10;
  // category:number = 0
  // type:string = ""
  // difficulty:string = ""
  //
  // questionText: string = "";
  // timeLeft: number = 15;
  // counter = 0;
  //
  // options: string[] = []
  //
  // // @ts-ignore
  // interval: NodeJS.Timer;
  //
  // startTimer() {
  //   this.interval = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft= 15;
  //       this.counter === this.questions.length ? this.endApp() : this.showQuestionHandler();
  //     }
  //   },1000)
  // }
  //
  // showQuestionHandler() {
  //   clearInterval(this.interval)
  //   this.options =
  //     (this.questions[this.counter].type === "multiple"
  //     ? [this.questions[this.counter].answer, ...this.questions[this.counter].incorrectAnswers]
  //     : ["True", "False"])
  //     .sort()
  //
  //   this.questionText = "" + this.questions[this.counter].question;
  //
  //   this.timeLeft = 15;
  //   this.startTimer();
  //   this.counter++;
  // };
  //
  // optionSelected(e:any) {
  //   if (this.questions[this.counter - 1].answer === e.target.outerText) {
  //     console.log("Correct!")
  //     console.log(e.target.outerText, this.questions[this.counter - 1].answer)
  //   } else {
  //     console.log("Incorrect!")
  //     console.log("Answer is:", this.questions[this.counter - 1].answer)
  //   }
  //   this.counter === this.questions.length ? this.endApp() : this.showQuestionHandler();
  // }
  //
  // endApp(){
  //   clearInterval(this.interval)
  //   // this.questions = [];
  //   Question.setQuestions = [];
  //   this.counter = 0;
  // }

  // async questionSetup():Promise<void> {
  //   let data = await this.opentdbService.getQuestions(this.amount, this.category, this.difficulty, this.type);
  //   let newQuestions = []
  //   for (let dataItem of data) {
  //     let newQuestion: Question = new Question(dataItem.correct_answer, dataItem.incorrect_answers, dataItem.question, dataItem.type)
  //     newQuestions.push(newQuestion);
  //   }
  //   await this.router.navigate(['/quiz'])
  //
  //   this.showQuestionHandler();
  // }
}
