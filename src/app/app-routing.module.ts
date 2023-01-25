import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ElementListComponent} from './element-list/element-list.component';
import {ElementDetailComponent} from './detail/element-detail.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'elements',
    component: ElementListComponent
  },
  {
    path: 'elements/:id',
    component: ElementDetailComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
