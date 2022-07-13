export class Question {
  private static _questions:Question[] = [];

  private _answer: string;
  private _incorrectAnswers: string[];
  private _question: string;
  private _type: string;

  constructor(answer: string, incorrectAnswers: string[], question: string, type: string) {
    this._answer = answer;
    this._incorrectAnswers = incorrectAnswers;
    this._question = question;
    this._type = type;
  }


  static get questions(): Question[] {
    return this._questions;
  }

  static set setQuestions(value: Question[]) {
    this._questions = value;
  }

  get answer(): string {
    return this._answer;
  }

  set setAnswer(value: string) {
    this._answer = value;
  }

  get incorrectAnswers(): string[] {
    return this._incorrectAnswers;
  }

  set setIncorrectAnswers(value: string[]) {
    this._incorrectAnswers = value;
  }

  get question(): string {
    return this._question;
  }

  set setQuestion(value: string) {
    this._question = value;
  }

  get type(): string {
    return this._type;
  }

  set setType(value: string) {
    this._type = value;
  }
}
