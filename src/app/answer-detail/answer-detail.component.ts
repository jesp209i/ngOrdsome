import {Component, Input, OnInit} from '@angular/core';
import { Request } from '../model/request';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  @Input() request: Request;
  constructor() { }

  ngOnInit() {
  }

}
