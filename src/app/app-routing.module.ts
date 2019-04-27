import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from './answers/answers.component';
import { RequestsComponent } from './requests/requests.component';
import {RequestNewComponent} from './request-new/request-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/requests', pathMatch: 'full'},
  { path: 'requests', component: RequestsComponent },
  { path: 'requests/:id', component: RequestsComponent },

  { path: 'request/new', component: RequestNewComponent},

  { path: 'answers', component: AnswersComponent }

]


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
