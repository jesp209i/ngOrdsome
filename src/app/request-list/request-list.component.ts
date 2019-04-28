import {Component, Input, OnInit, SimpleChanges, OnChanges} from '@angular/core';
import { Request } from '../model/request';


@Component({
  selector: 'app-requests',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  @Input() requests: Request[];
  @Input() request: Request;

  constructor() { }

  ngOnInit() {
  }

}
