import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestsComponent } from './requests/requests.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AnswersComponent } from './answers/answers.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { RequestNewComponent } from './request-new/request-new.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestDetailComponent,
    RequestsComponent,
    MessagesComponent,
    AnswersComponent,
    AnswerDetailComponent,
    RequestNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
