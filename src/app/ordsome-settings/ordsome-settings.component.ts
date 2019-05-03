import { Component, OnInit } from '@angular/core';
import {MessageService} from '../service/message.service';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-ordsome-settings',
  templateUrl: './ordsome-settings.component.html',
  styleUrls: ['./ordsome-settings.component.css']
})
export class OrdsomeSettingsComponent implements OnInit {

  private guid = 'ffb73ec5-f6d2-4b89-a50a-9ae5d8e727b3';
  localUserGuid: string;
  constructor(private messageService: MessageService,
              private apiService: ApiService) { }

  ngOnInit() {
    //localStorage.setItem('userGuid', this.guid);
    this.log(`visited`);
    this.localUserGuid = localStorage.getItem('userGuid');
  }

  private log(message: string) {
    this.messageService.add(`ordsome-settings: ${message}`);
  }
}
