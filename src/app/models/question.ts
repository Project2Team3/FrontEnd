export class Question {
  answer: string;
  incorrectAnswers: string[];
  question: string;
  type: string;

  constructor(answer: string, incorrectAnswers: string[], question: string, type: string) {
    this.answer = answer;
    this.incorrectAnswers = incorrectAnswers;
    this.question = question;
    this.type = type;
  }
}
