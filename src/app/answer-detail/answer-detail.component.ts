import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';
import {MessageService} from '../service/message.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit, OnChanges {
  @Input() request: Request;
  constructor(private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.request) {
      this.getAnswers();
    }
  }

  private getAnswers() {
    this.apiService.getAnswers(this.request.requestId)
      .subscribe((response) => {
        this.request.answers = response.body;
      });
  }
  log(message: string) {
    this.messageService.add(`AnswerDetail: ${message}`);
  }
}
