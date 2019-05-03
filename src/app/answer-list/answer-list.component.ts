import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { ApiService} from '../service/api.service';
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-answers',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request;

  constructor(private apiService: ApiService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getRequests();
    this.log(`visited`);
  }

  getRequests() {
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests.body);
  }
  onSelect(request: Request) {
    this.selectedRequest = request;
  }
  private log(message: string){
    this.messageService.add(`AnswerList: ${message}`)
  }
}
