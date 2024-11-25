import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompradorVendedorPageRoutingModule } from './comprador-vendedor-routing.module';

import { CompradorVendedorPage } from './comprador-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompradorVendedorPageRoutingModule
  ],
  declarations: [CompradorVendedorPage]
})
export class CompradorVendedorPageModule {}
