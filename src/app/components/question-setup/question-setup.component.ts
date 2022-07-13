import { Component } from '@angular/core';
import { OpentdbService } from '../../services/opentdbService/opentdb.service';
import { Question } from '../../models/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-setup',
  templateUrl: './question-setup.component.html',
  styleUrls: ['./question-setup.component.css'],
})
export class QuestionSetupComponent {
  constructor(private opentdbService: OpentdbService, private router: Router) {}

  questions: Question[] = Question.questions;

  amount: number = 10;
  category: number = 0;
  type: string = '';
  difficulty: string = '';

  options: string[] = [];

  async questionSetup(): Promise<void> {
    let data = await this.opentdbService.getQuestions(
      this.amount,
      this.category,
      this.difficulty,
      this.type
    );
    let newQuestions = [];
    for (let dataItem of data) {
      let newQuestion: Question = new Question(
        dataItem.correct_answer,
        dataItem.incorrect_answers,
        dataItem.question,
        dataItem.type
      );
      newQuestions.push(newQuestion);
    }
    Question.setQuestions = newQuestions;
    await this.router.navigate(['/quiz']);
  }
}
