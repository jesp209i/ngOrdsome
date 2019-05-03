import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {MessageService} from "../service/message.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
 @Input() title: string;
  myPath: string;
  constructor(private router: Router,
              private location: Location,
              private messageService: MessageService) { }

  ngOnInit() {
    this.router.events.subscribe( event => {
      // this.log(this.location.path());
      this.myPath = this.location.path();
    });
  }

  log(message: string) {
    this.messageService.add(`App:${message}`);
  }

}
