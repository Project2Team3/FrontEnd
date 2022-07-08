import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Question} from "../question"

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePageComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  @ViewChild('questionSetupForm') questionSetupForm: ElementRef | undefined;
  @ViewChild('questionContainer') questionContainer: ElementRef | undefined;
  questionText: string = "";
  questionOptionsDiv: any = "";

  questions:Question[] = [];
  counter = 0;

  options: string[] = []

  timeLeft: number = 15;
  // @ts-ignore
  interval: NodeJS.Timer;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft= 15;
        if (this.counter === this.questions.length) {
          this.endApp()
        } else {
          this.showQuestionHandler()
        }
      }
    },1000)
  }

  showQuestionHandler() {
    clearInterval(this.interval)
    if ((this.questions)[this.counter].type === "multiple") {
      this.options = [
        (this.questions)[this.counter].answer,
        ...(this.questions)[this.counter].incorrectAnswers,
      ];
      this.options = this.options.sort();
    } else {
      this.options = ["True", "False"];
    }
    this.questionText = "" + this.questions[this.counter].question;

    this.timeLeft = 15;
    this.startTimer();
    this.counter++;
  };

  optionSelected(e:any) {
    console.log(e.target.outerText)
    console.log(this.counter)
    console.log(this.questions.length)

    if (this.questions[this.counter - 1].answer === e.target.outerText) {
      console.log(e.target.outerText, this.questions[this.counter - 1].answer)
      if (this.counter === this.questions.length) {
        this.endApp()
      } else {
        this.showQuestionHandler()
      }

    } else {
      console.log("Answer is:", this.questions[this.counter - 1].answer)
      if (this.counter === this.questions.length) {
        this.endApp()
      } else {
        this.showQuestionHandler()
      }
    }
  }

  endApp(){
    clearInterval(this.interval)
    this.questionSetupForm?.nativeElement.classList.remove("inactive");
    this.questionContainer?.nativeElement.classList.add("inactive");
    this.questions = [];
    this.counter = 0;
  }

  async questionSetupSubmit (e:any) {
    e.preventDefault();
    if (e.submitter !== null) {
      let amount = e.target[0].value;
      let category = e.target[1].value;
      let difficulty = e.target[2].value;
      let type = e.target[3].value;

      let data = await this.fetchQuestions(amount, category, difficulty, type);

      if (data.results) {
        for (let dataItem of data.results) {
          let newQuestion: Question = {
            answer: dataItem.correct_answer,
            incorrectAnswers:dataItem.incorrect_answers,
            question:dataItem.question,
            type:dataItem.type
          }
          this.questions.push(newQuestion);
        }
      }

      this.questionSetupForm?.nativeElement.classList.add("inactive");
      this.questionContainer?.nativeElement.classList.remove("inactive");

      this.showQuestionHandler();
    }
  };

  fetchQuestions = async (amount: any, category: string, difficulty: string, type: string) => {
    let URL;
    if (category === "" && difficulty === "" && type === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}`;
    } else if (difficulty === "" && type === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}`;
    } else if (category === "" && difficulty === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&type=${type}`;
    } else if (category === "" && type === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}`;
    } else if (category === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`;
    } else if (type === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}`;
    } else if (difficulty === "") {
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`;
    } else {
      URL = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    }
    return await fetch(URL).then((response) => response.json());
  };
}
