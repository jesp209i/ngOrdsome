import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnChanges {
  @Input() request: Request = null;

  constructor(private apiService: ApiService,
              private messageService: MessageService) {}

  ngOnChanges() {
    if (this.request) {
      this.getAnswers(this.request.requestId);
    }
  }

  private getAnswers(requestId: number) {
      this.apiService.getAnswers(requestId)
        .subscribe((response) => {
          this.request.answers = response.body;
          this.log(`getAnswers() requestId: ${requestId} HttpStatus: ${response.status}`);
        });
    }
    log(message: string) {
      this.messageService.add(`RequestDetail: ${message}`);
    }
}
