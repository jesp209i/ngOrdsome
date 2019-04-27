import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Location} from '@angular/common';
import { Request } from '../model/request';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: Request[];
  selectedRequest: Request = null;
  constructor( private apiService: ApiService,
               private route: ActivatedRoute,
               private location: Location) { }

  ngOnInit() {
    this.getRequests();
    this.getSelectedRequest();
  }

  getRequests(): void{
    this.apiService.getRequests()
      .subscribe(requests => this.requests = requests);
    console.log(this.requests.toString());
  }

  getSelectedRequest(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.selectedRequest = this.requests.find(request => request.requestId === id);
  }

}
