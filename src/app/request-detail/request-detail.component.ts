import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';
import {MessageService} from '../service/message.service';
import {Answer} from '../model/answer';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnChanges {
  @Input() request: Request = null;
  private answers: Answer[];

  constructor(private apiService: ApiService,
              private messageService: MessageService) {}

  ngOnChanges() {
    if (this.request) {
      this.getAnswers(this.request.requestId);
      this.log(`Is the request closed? ${this.request.isClosed}`)
    }
  }

  private getAnswers(requestId: number) {
      this.apiService.getAnswers(requestId)
        .subscribe((response) => {
          this.request.answers = response.body;
          this.log(`getAnswers() requestId: ${requestId} HttpStatus: ${response.status}`);
        });
    }

    changeRequestStatus() {
      this.answers = this.request.answers;
      this.changeStatus();
    }

    log(message: string) {
      this.messageService.add(`RequestDetail: ${message}`);
    }

    private changeStatus() {
    const myRequest = this.request;
    if (myRequest.isClosed) {
      myRequest.isClosed = false;
    } else if (!myRequest.isClosed) {
      myRequest.isClosed = true;
    }
    this.apiService.changeRequestStatus(myRequest)
      .subscribe( response => { if (response.status === 204) {
        this.getRequest();
      }});
    }

    private getRequest() {
      this.apiService.getRequest(this.request.requestId)
        .subscribe( response => {
          if (response.status === 200) {
            this.request = response.body;
            this.request.answers = this.answers;
          }
        });
    }
    changeAnswerStatus(answer: Answer) {
    this.log(`${answer.isPreferred}`);
    if (answer.isPreferred === true) {
        answer.isPreferred = false;
      } else if (answer.isPreferred === false || answer.isPreferred === undefined) {
        answer.isPreferred = true;
      }
    this.log(`changeAnswerStatus changed answer ${answer.answerId} to isPreferred = ${answer.isPreferred}`);
    //
    // needs to save the state of answer
    // Api not ready yet
    // This is just for show
    //
  }
}
