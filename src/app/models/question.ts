export class Question {
  private static _questions: Question[] = [];

  private readonly _answer: string;
  private readonly _incorrectAnswers: string[];
  private readonly _question: string;
  private readonly _type: string;

  constructor(
    answer: string,
    incorrectAnswers: string[],
    question: string,
    type: string
  ) {
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
  get incorrectAnswers(): string[] {
    return this._incorrectAnswers;
  }
  get question(): string {
    return this._question;
  }
  get type(): string {
    return this._type;
  }
}
