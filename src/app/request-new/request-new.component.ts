import { Component, OnInit } from '@angular/core';

import { MessageService } from '../service/message.service';
import { CreateRequest } from '../model/dto/createRequest';
import { ApiService } from '../service/api.service';
import { OrdsomeService } from '../service/ordsome.service';
import { Language } from '../model/language';

@Component({
  selector: 'app-request-new',
  templateUrl: './request-new.component.html',
  styleUrls: ['./request-new.component.css']
})
export class RequestNewComponent implements OnInit, CallbackInterface {

  constructor( private messageService: MessageService,
               private apiService: ApiService,
               private ordsomeService: OrdsomeService
  ) { }

  private newRequest: CreateRequest = new CreateRequest();
   private languageList: Language[];

  ngOnInit() {
    // this.newRequest.languageTarget = navigator.language;
    this.log('visited');
    if (this.languageList === undefined || this.languageList.length === 0 ) {
      this.ordsomeService.getLanguages(this);
    }
  }

  onSubmit() {
    // this.log(`${this.getDiagnostics()}`);
    this.apiService.addRequest(this.newRequest)
      .subscribe(response => { this.log(`${response.status}`); } );
    this.newRequest = new CreateRequest();
  }
  doneLoading(): void {
    this.languageList = this.ordsomeService.languages;
    this.log(`doneLoading(): available languages: ${this.languageList.length}`);
  }

  getDiagnostics() {
    return JSON.stringify(this.newRequest);
  }

  private log(message: string) {
    this.messageService.add(`RequestNew: ${message}`);
  }
}
