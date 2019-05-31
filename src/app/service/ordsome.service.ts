import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Language } from '../model/language';
import { MessageService } from './message.service';
import {CallbackInterface} from './interface/callbackInterface';

@Injectable({
  providedIn: 'root'
})
export class OrdsomeService implements CallbackInterface {
  constructor(private apiService: ApiService,
              private messageService: MessageService) {
    this.log('started');
    this.ordsomeInit();
  }
  public languages: Language[] = new Array();
  userId: string;
  token: string;

  // only call when finished setting up user.
  doneLoading(): void {
    window.location.reload();
  }

  private ordsomeInit() {
    // this.log(`${}`);
    const userExists = this.clientHasUserId();
    this.log(`ordsomeInit(): User exists? ${userExists}`);
    if (!userExists) {
      this.getNewUserId(this);
    } else {
      this.getUserId();
    }
    this.log(`ordsomeInit() got UserId: ${this.userId}`);
    this.log('ordsomeInit() requesting languages');
    this.getLanguages(null);
  }

  getLanguages(callback: CallbackInterface = null) {
    let languagesNeedToLoad = false;
    if (this.languages === undefined || this.languages.length === 0 || this.languages === null) {
      this.loadLanguages(callback);
      languagesNeedToLoad = true;
    }
    this.log(`getLanguages(): available no of languages: ${this.languages.length}`);
    if (!languagesNeedToLoad) {
      callback.doneLoading();
    }
  }
  log(message: string) {
    this.messageService.add(`OrdsomeService: ${message}`);
  }

  loadLanguages(callback: CallbackInterface = null) {
    this.apiService.getLanguages()
      .subscribe( response => {
        this.languages = response.body;
        if (callback != null) {
          callback.doneLoading();
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
  getNewUserId(callback: CallbackInterface) {
    this.apiService.newUserId()
      .subscribe( response => {
        if (response.status === 200) {
          this.userId = response.body;
          this.storeUserId(this.userId);
          this.log(`getNewUserId(): ${this.userId}`);
          callback.doneLoading();
        }
      });
  }
}
