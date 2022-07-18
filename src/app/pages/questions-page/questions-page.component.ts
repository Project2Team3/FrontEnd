import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Question } from '../../models/question';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/users.service';
import { User } from '../../models/user';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css'],
})
export class QuestionsPageComponent implements OnInit {
  currentUserString: any = sessionStorage.getItem('user');
  currentUserJSON: any = {};

  questions: Question[] = [];
  active: string = 'initial';
  answer: string = '';
  yourAnswer: string = '';
  status: string = '';
  pointsAccumulated: number = 0;
  color: string = '';

  questionText: string = '';
  timeLeft: number = 15;
  counter = 0;

  options: string[] = [];

  // @ts-ignore
  interval: NodeJS.Timer;
  buttonStatus: string = 'Loading';

  constructor(
    private router: Router,
    private userService: UserService,
    private appComponent: AppComponent
  ) {}

  ngOnInit(): void {
    this.questions = Question.questions;
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/home']);
    } else if (this.questions.length === 0) {
      this.router.navigate(['/home']);
    } else {
      setTimeout(() => {
        this.appSetup();
      }, 2000);
    }
  }

  appSetup() {
    this.active = 'question';
    this.showQuestionHandler();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        if (this.pointsAccumulated - 10 < 0) {
          this.status = "TIME'S UP!";
          this.pointsAccumulated = 0;
        } else {
          this.status = "TIME'S UP! -10 Points...";
          this.pointsAccumulated -= 10;
        }
        this.active = 'picked';
        this.answer = 'Answer: ' + this.questions[this.counter - 1].answer;
        this.yourAnswer = '';

        clearInterval(this.interval);

        setTimeout(() => {
          this.timeLeft = 15;
          this.counter === this.questions.length
            ? this.endApp()
            : this.showQuestionHandler();
        }, 3000);
      }
    }, 1000);
  }

  showQuestionHandler() {
    this.active = 'question';
    clearInterval(this.interval);
    this.options = (
      this.questions[this.counter].type === 'multiple'
        ? [
            this.questions[this.counter].answer,
            ...this.questions[this.counter].incorrectAnswers,
          ]
        : ['True', 'False']
    ).sort();

    this.questionText = '' + this.questions[this.counter].question;

    this.timeLeft = 15;
    this.startTimer();
    this.counter++;
  }

  optionSelected(e: any) {
    clearInterval(this.interval);
    this.active = 'picked';
    this.answer = 'Answer: ' + this.questions[this.counter - 1].answer;
    let points = -10;

    if (this.questions[this.counter - 1].answer === e.target.id) {
      let pointsGained = 50.0 + (this.timeLeft / 14.0) * 50.0;
      points = this.timeLeft > 14 ? 100 : pointsGained;
      this.status = `CORRECT! +${Math.round(points)} Points...`;
      this.yourAnswer = '';
      this.pointsAccumulated += Math.round(points);
    } else {
      this.color = 'red';
      if (this.pointsAccumulated - 10 < 0) {
        this.status = 'INCORRECT!';
        this.pointsAccumulated = 0;
      } else {
        this.status = 'INCORRECT! -10 Points...';
        this.pointsAccumulated -= 10;
      }
      this.yourAnswer = 'Your Answer: ' + e.target.outerText;
    }

    setTimeout(() => {
      this.counter === this.questions.length
        ? this.endApp()
        : this.showQuestionHandler();
    }, 3000);
  }

  endApp() {
    this.buttonStatus = 'Loading';
    clearInterval(this.interval);
    Question.setQuestions = [];
    this.counter = 0;
    this.active = 'end';
    this.currentUserJSON = JSON.parse(this.currentUserString);
    let updatedUser: User;
    this.userService.findUserById(this.currentUserJSON.id).subscribe({
      next: (data: User) => {
        let newUser: User = new User(
          data.id,
          data.username,
          data.password,
          data.country,
          data.points + this.pointsAccumulated,
          data.email
        );
        this.appComponent.updateSessionStorage(newUser);
        this.userService.updateUser(newUser).subscribe({
          next: (data: User) => {
            updatedUser = data;
            this.buttonStatus = 'Done';
          },
        });
      },
    });
  }

  onDoneButtonClick() {
    this.router.navigate(['/home']);
  }
}
