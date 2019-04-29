import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { CreateRequest } from '../model/dto/createRequest';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-request-new',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.css']
})
export class RequestNewComponent implements OnInit {

  constructor( private messageService: MessageService,
               private apiService: ApiService) { }

  private newRequest: CreateRequest = new CreateRequest();

  ngOnInit() {
    this.newRequest.languageTarget = navigator.language;
    this.log('visited');
  }

  onSubmit() {
    this.apiService.addRequest(this.newRequest)
      .subscribe(() => { window.location.href = 'http://127.0.0.1:4200/requests'; } );
  }

  getDiagnostics() {
    return JSON.stringify(this.newRequest);
  }

  private log(message: string) {
    this.messageService.add(`RequestNew: ${message}`);
  }
}
