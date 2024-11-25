import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompradorProductoPageRoutingModule } from './comprador-producto-routing.module';

import { CompradorProductoPage } from './comprador-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompradorProductoPageRoutingModule
  ],
  declarations: [CompradorProductoPage]
})
export class CompradorProductoPageModule {}
