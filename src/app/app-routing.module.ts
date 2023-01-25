import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableWithPaginationComponent} from './table-with-pagination/table-with-pagination.component';
import {DetailComponent} from './detail/detail.component';
import {WelcomeComponent} from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent
  },
  {
    path: 'elements',
    component: TableWithPaginationComponent
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
