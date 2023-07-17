import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error403Component } from './error403/error403.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error-403',
        component: Error403Component,
        data: {
          title: 'Error 403'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
