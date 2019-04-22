import { Component, OnInit, Input } from '@angular/core';
import { Request } from '../model/request';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {
  @Input() request: Request;

  constructor() { }

  ngOnInit() {
  }

}
