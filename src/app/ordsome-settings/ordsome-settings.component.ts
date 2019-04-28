import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {ApiService} from '../service/api.service';

@Component({
  selector: 'app-ordsome-settings',
  templateUrl: './ordsome-settings.component.html',
  styleUrls: ['./ordsome-settings.component.css']
})
export class OrdsomeSettingsComponent implements OnInit {

  constructor(private messageService: MessageService,
              private apiService: ApiService) { }

  ngOnInit() {
    this.log(`visited`);
  }

  private log(message: string) {
    this.messageService.add(`ordsome-settings: ${message}`);
  }
}
