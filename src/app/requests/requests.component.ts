import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Request } from '../model/request';
import { ApiService } from '../service/api.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request;

  constructor( private apiService: ApiService,
               private route: ActivatedRoute,
               private location: Location,
               private messageService: MessageService) { }

  ngOnInit() {
    this.getRequests();
    this.getRequestId();
    this.log('Requests initiated');

  }

  ngOnChanges(changes: SimpleChanges) {
    this.getRequestId();
  }

  getRequests(): void {
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests);
  }

  onSelect(request: Request) {
    this.selectedRequest = request;
  }

  getRequestId(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.log(`getRequestId says: id from route is: ${id}`);
    this.selectedRequest = this.requests.find(request => request.requestId === id);
  }

  private log(message: string) {
    this.messageService.add(`Requests: ${message}`);
  }
}
