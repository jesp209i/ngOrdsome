import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService} from './service/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngOrdsome';
  myPath: string;
  constructor(private router: Router,
              private location: Location,
              private messageService: MessageService) {}
  ngOnInit() {
    this.router.events.subscribe( event => {
      // this.log(this.location.path());
      this.myPath = this.location.path();
    });
  }

  log(message: string){
    this.messageService.add(`App:${message}`);
  }
}
