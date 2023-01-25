import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ElementListComponent} from './table-with-pagination/element-list.component';
import {DetailComponent} from './detail/detail.component';
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
    component: DetailComponent
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
