import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit, OnChanges {
  @Input() request: Request;
  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.request) {
      this.getAnswers();
    }
  }

  private getAnswers() {
    this.apiService.getAnswers(this.request.requestId)
      .subscribe(answers => this.request.answers = answers);
  }
}
