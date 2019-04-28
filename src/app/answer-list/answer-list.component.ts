import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { ApiService} from '../service/api.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests);
  }
  onSelect(request: Request) {
    this.selectedRequest = request;
  }
}
