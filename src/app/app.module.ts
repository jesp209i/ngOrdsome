import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RequestDetailComponent } from './request-detail/request-detail.component';
import { RequestListComponent } from './request-list/request-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerDetailComponent } from './answer-detail/answer-detail.component';
import { RequestNewComponent } from './request-new/request-new.component';
import { AnswerFormComponent } from './answer-form/answer-form.component';
import { OrdsomeSettingsComponent } from './ordsome-settings/ordsome-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    RequestDetailComponent,
    RequestListComponent,
    MessagesComponent,
    AnswerListComponent,
    AnswerDetailComponent,
    RequestNewComponent,
    AnswerFormComponent,
    OrdsomeSettingsComponent,
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
