import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import {RequestNewComponent} from './request-new/request-new.component';
import {RequestDetailComponent} from './request-detail/request-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/requests', pathMatch: 'full'},
  { path: 'requests', component: RequestListComponent },
  { path: 'requests/:id', component: RequestDetailComponent },
  { path: 'requests/new', component: RequestNewComponent},
  { path: 'answers', component: AnswerListComponent }

]


@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
