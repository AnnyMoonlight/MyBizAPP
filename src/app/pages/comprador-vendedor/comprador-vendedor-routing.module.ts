import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompradorVendedorPage } from './comprador-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: CompradorVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompradorVendedorPageRoutingModule {}
