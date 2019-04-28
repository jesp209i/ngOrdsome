import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CreateAnswer} from '../model/dto/createAnswer';
import {ApiService} from '../service/api.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit, OnChanges {
  @Input() requestId: number;
  @Input() languageTarget: string;
  newAnswer: CreateAnswer = new CreateAnswer();
  constructor(private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newAnswer.requestId = this.requestId;
  }
  onSubmit() {
    this.log('form submitted');
    this.apiService.addAnswer(this.newAnswer);
    this.newAnswer = new CreateAnswer();
    this.newAnswer.requestId = this.requestId;
  }
  private log(message: string) {
    this.messageService.add(`answerForm: ${message}`);
  }

  debugger() {
    return JSON.stringify(this.newAnswer);
  }
}
