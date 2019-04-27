import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() request: Request;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAnswers(this.request.id);
  }
  getAnswers(requestId : number): void{
    this.apiService.getAnswers(requestId)
      .subscribe(answers => this.request.answers = answers);
  }

}
