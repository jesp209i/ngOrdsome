import {Answer} from './answer';

export class Request {
  requestId: number;
  textToTranslate: string;
  languageOrigin: string;
  languageTarget: string;
  noOfAnswers: number;
  answers: Answer[];
}

