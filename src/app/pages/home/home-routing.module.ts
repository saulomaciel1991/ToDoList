import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },

  {
    path: '',
    children: [
      {
        path: ':tarefaId',
        loadChildren: () => import('./editar/editar.module').then(m => m.EditarPageModule)
      },
      {
        path: 'novo',
        loadChildren: () => import('./novo/novo.module').then(m => m.NovoPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
