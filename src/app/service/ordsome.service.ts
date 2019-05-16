import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Language } from '../model/language';
import { MessageService } from './message.service';
import {CallbackInterface} from './interface/callbackInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdsomeService {
  constructor(private apiService: ApiService,
              private messageService: MessageService) {
    this.log('started');
  }
  public languages: Language[] = new Array();
  userId: string;
  token: string;

  getLanguages(callback: CallbackInterface = null) {
    if (this.languages === undefined || this.languages.length === 0 || this.languages === null) {
      this.loadLanguages(callback);
    }
    this.log(`getLanguages(): available no of languages: ${this.languages.length}`);
  }
  log(message: string) {
    this.messageService.add(`OrdsomeService: ${message}`);
  }

  loadLanguages(callback: CallbackInterface = null) {
    this.apiService.getLanguages()
      .subscribe( response => {
        this.languages = response.body;
        if (callback != null) {
          callback.doneLoading(response);
        }});
    this.log(`loadLanguages(): called`);
  }
  clientHasUserId(): boolean {
    let userExists = false;
    if (localStorage.getItem('ordsomeUserGuid')) {
      userExists = true;
    }
    return userExists;
  }
  getUserId() {
    this.userId = localStorage.getItem('ordsomeUserGuid');
  }
  storeUserId(ordsomeUserGuid: string) {
    localStorage.setItem('ordsomeUserGuid', ordsomeUserGuid);
  }
  getNewUserId() {
    this.apiService.newUserId()
      .subscribe( response => {
        if (response.status === 200) {
          this.userId = response.body;
        }
      });
  }
}
