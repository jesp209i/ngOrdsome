import { Component, OnInit } from '@angular/core';
import {MessageService} from '../service/message.service';
import {OrdsomeService} from '../service/ordsome.service';

@Component({
  selector: 'app-ordsome-settings',
  templateUrl: './ordsome-settings.component.html',
  styleUrls: ['./ordsome-settings.component.css']
})
export class OrdsomeSettingsComponent implements OnInit {

  localUserGuid: string;
  constructor(private messageService: MessageService,
              public ordsomeService: OrdsomeService) { }

  ngOnInit() {
    this.log(`visited`);
  }

  private log(message: string) {
    this.messageService.add(`ordsome-settings: ${message}`);
  }
}
