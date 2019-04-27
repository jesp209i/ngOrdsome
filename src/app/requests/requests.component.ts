import { Component, OnInit } from '@angular/core';
import { Request } from '../model/request';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request;
  constructor( private apiService: ApiService) { }

  ngOnInit() {
    this.getRequests();
    this.selectedRequest = null;
  }

  onSelect(request: Request): void {
    this.selectedRequest = request;
  }

  getRequests(): void{
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests);
    console.log(this.requests.toString());
  }

}
