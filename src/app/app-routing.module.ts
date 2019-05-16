import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { RequestNewComponent } from './request-new/request-new.component';
import { OrdsomeSettingsComponent } from './ordsome-settings/ordsome-settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/new/request', pathMatch: 'full'},
  { path: 'requests', component: RequestListComponent },
  { path: 'new/request', component: RequestNewComponent},
  { path: 'answers', component: AnswerListComponent },
  { path: 'settings', component: OrdsomeSettingsComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
