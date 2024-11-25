import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradorProductoPage } from './comprador-producto.page';

const routes: Routes = [
  {
    path: '',
    component: CompradorProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradorProductoPageRoutingModule {}
