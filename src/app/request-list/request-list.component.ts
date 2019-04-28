import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { Request } from '../model/request';
import {ApiService} from '../service/api.service';


@Component({
  selector: 'app-requests',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getRequests();
  }

  onSelect(request: Request) {
    this.selectedRequest = request;
  }

  getRequests() {
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests.body);
  }
}
