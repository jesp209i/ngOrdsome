import {Answer} from './answer';

export class Request {
  id: number;
  textToTranslate: string;
  languageOrigin: string;
  languageTarget: string;
  answers: Answer[];
}

