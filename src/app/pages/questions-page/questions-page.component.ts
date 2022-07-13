import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/question';
import { Router } from '@angular/router';
import { UserService } from '../../services/userService/users.service';
import { AppComponent } from '../../app.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.css'],
})
export class QuestionsPageComponent implements OnInit {
  questions: Question[] = [];
  active: string = 'initial';
  answer: string = '';
  yourAnswer: string = '';
  status: string = '';
  // currentUserString: any = sessionStorage.getItem('user');
  // currentUser: any = JSON.parse(this.currentUserString);

  questionText: string = '';
  timeLeft: number = 15;
  counter = 0;

  options: string[] = [];

  // @ts-ignore
  interval: NodeJS.Timer;

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
        this.active = 'picked';
        this.status = "TIME'S UP! -10 Points...";
        this.answer = 'Answer: ' + this.questions[this.counter - 1].answer;
        this.yourAnswer = '';

        clearInterval(this.interval);

        // this.currentUser.points -= 10;
        // console.log(
        //   `The user, ${this.currentUser} is getting ${-10} for a total of ${
        //     this.currentUser.points
        //   }`
        // );
        // this.appComponent.currentUser!.points -= 10;
        // console.log(this.appComponent.currentUser)
        // if (this.appComponent.currentUser instanceof User) {
        //   this.userService.updateUser(this.appComponent.currentUser)
        // }

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
    console.log(this.questions, this.counter);
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

    if (this.questions[this.counter - 1].answer === e.target.outerText) {
      let pointsGained = 50.0 + (this.timeLeft / 14.0) * 50.0;
      points = this.timeLeft > 14 ? 100 : pointsGained;
      this.status = `CORRECT! +${Math.round(points)} Points...`;
      this.yourAnswer = '';
    } else {
      this.status = 'INCORRECT! -10 Points...';
      this.yourAnswer = 'Your Answer: ' + e.target.outerText;
    }

    // sessionStorage.setItem(
    //   'user',
    //   JSON.stringify({
    //     id: this.currentUser.id,
    //     username: this.currentUser.username,
    //     country: this.currentUser.password,
    //     points: this.currentUser.points + Math.round(points),
    //     email: this.currentUser.email,
    //   })
    // );

    // let password: string = '';
    // await this.userService.findUserById(this.currentUser.id).subscribe({
    //   next: (data: User) => {
    //     password = data.password;
    //   },
    // });

    // let newUser: User = new User(
    //   this.currentUser.id,
    //   this.currentUser.username,
    //   password,
    //   this.currentUser.country,
    //   this.currentUser.points + Math.round(points),
    //   this.currentUser.email
    // );

    // console.log(newUser);

    // this.userService.updateUser(newUser);

    setTimeout(() => {
      this.counter === this.questions.length
        ? this.endApp()
        : this.showQuestionHandler();
    }, 3000);
  }

  endApp() {
    clearInterval(this.interval);
    Question.setQuestions = [];
    this.counter = 0;
    this.router.navigate(['/home']);
  }
}