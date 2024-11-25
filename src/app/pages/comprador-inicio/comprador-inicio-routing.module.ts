import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradorInicioPage } from './comprador-inicio.page';

const routes: Routes = [
  {
    path: '',
    component: CompradorInicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradorInicioPageRoutingModule {}
