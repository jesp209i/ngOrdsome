import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';
import {Answer} from '../model/answer';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() request: Request;
  answers: Answer[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAnswers();
  }

  getAnswers(): void {
    this.apiService.getAnswers(this.request.id)
      .subscribe(answers => this.answers = answers);
  }

}
