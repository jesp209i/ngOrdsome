import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CreateAnswer} from '../model/dto/createAnswer';
import {ApiService} from '../service/api.service';
import {MessageService} from '../message.service';
import {Request} from '../model/request';
import {Answer} from '../model/answer';

@Component({
  selector: 'app-answer-form',
  templateUrl: './answer-form.component.html',
  styleUrls: ['./answer-form.component.css']
})
export class AnswerFormComponent implements OnInit, OnChanges {
  @Input() request: Request;
  newAnswer: CreateAnswer = new CreateAnswer();
  constructor(private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newAnswer.requestId = this.request.requestId;
  }
  onSubmit() {
    this.log('form submitted');
    this.apiService.addAnswer(this.newAnswer)
      .subscribe(
        response => {
          if (response.status === 204){
            this.request.answers.push(new Answer());
            this.request.noOfAnswers++;
          }
        }
      );
    this.newAnswer = new CreateAnswer();
    this.newAnswer.requestId = this.request.requestId;
  }
  private log(message: string) {
    this.messageService.add(`answerForm: ${message}`);
  }

  debugger() {
    return JSON.stringify(this.newAnswer);
  }
}
