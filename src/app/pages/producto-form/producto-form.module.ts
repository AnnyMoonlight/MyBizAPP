import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoFormPageRoutingModule } from './producto-form-routing.module';

import { ProductoFormPage } from './producto-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoFormPageRoutingModule
  ],
  declarations: [ProductoFormPage]
})
export class ProductoFormPageModule {}
