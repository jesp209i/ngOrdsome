import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {Language} from "../model/language";

@Injectable({
  providedIn: 'root'
})
export class OrdsomeService {
  constructor(private apiService: ApiService) { }
  languages: Language[];
  userId: string;
  token: string;


  getNewUserId(){
    this.apiService.newUserId()
      .subscribe( response -> {
        if (response.status === 200) {
          this.userId = response.body;
        }
      })
  }
}
