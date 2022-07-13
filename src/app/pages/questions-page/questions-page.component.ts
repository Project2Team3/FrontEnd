import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/question";
import {Router} from "@angular/router";

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css']
})
export class QuestionsPageComponent implements OnInit {

  constructor(private router:Router) { }
  questions:Question[] = [];
  active:string = "question"
  answer:string = "";
  yourAnswer:string = "";
  status:string = ""

  questionText: string = "";
  timeLeft: number = 15;
  counter = 0;

  options: string[] = []

  // @ts-ignore
  interval: NodeJS.Timer;

  ngOnInit(): void {
    this.questions = Question.questions;
    if (this.questions.length === 0) {
      this.router.navigate(["/home"])
    }
    this.showQuestionHandler()
  }


  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.active = "picked"
        this.status = "TIME'S UP!"
        this.answer = "Answer: " + this.questions[this.counter - 1].answer;
        clearInterval(this.interval)
        setTimeout(() => {
          this.timeLeft= 15;
          this.counter === this.questions.length ? this.endApp() : this.showQuestionHandler();
        }, 3000)
      }
    },1000)
  }

  showQuestionHandler() {
    this.active = "question"
    clearInterval(this.interval)
    console.log(this.questions, this.counter)
    this.options =
      (this.questions[this.counter].type === "multiple"
        ? [this.questions[this.counter].answer, ...this.questions[this.counter].incorrectAnswers]
        : ["True", "False"])
        .sort()

    this.questionText = "" + this.questions[this.counter].question;

    this.timeLeft = 15;
    this.startTimer();
    this.counter++;
  };

  optionSelected(e:any) {
    this.active = "picked"
    this.answer = "Answer: " + this.questions[this.counter - 1].answer;

    if (this.questions[this.counter - 1].answer === e.target.outerText) {
      this.status = "CORRECT!"
      this.yourAnswer = "";
    } else {
      this.status = "INCORRECT!"
      this.yourAnswer = "Your Answer: " + e.target.outerText;
    }

    clearInterval(this.interval)
    setTimeout(() => {
      this.counter === this.questions.length ? this.endApp() : this.showQuestionHandler();
    }, 3000)
  }

  endApp(){
    clearInterval(this.interval)
    Question.setQuestions = [];
    this.counter = 0;
    this.router.navigate(["/home"])

  }

}
