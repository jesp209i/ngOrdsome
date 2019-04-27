import {Answer} from './answer';

export class Request {
  id: number;
  textToTranslate: string;
  languageOrigin: string;
  languageTarget: string;
  noOfAnswers: number;
  answers: Answer[];
}

