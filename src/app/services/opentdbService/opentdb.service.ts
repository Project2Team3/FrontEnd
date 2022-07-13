import { Injectable } from '@angular/core';

const opentdbUrl = 'https://opentdb.com/api.php?';

@Injectable({
  providedIn: 'root',
})
export class OpentdbService {
  constructor() {}

  async getQuestions(
    amount: number,
    category: number,
    difficulty: string,
    type: string
  ) {
    const opentdbFullUrl =
      opentdbUrl +
      `amount=${amount ? amount : ''}` +
      `&category=${category ? category : ''}` +
      `&difficulty=${difficulty ? difficulty : ''}` +
      `&type=${type ? type : ''}`;

    const data = await fetch(opentdbFullUrl).then((response) =>
      response.json()
    );
    return data.results;
  }
}
