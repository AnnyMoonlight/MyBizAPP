import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendedorInicioPageRoutingModule } from './vendedor-inicio-routing.module';

import { VendedorInicioPage } from './vendedor-inicio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendedorInicioPageRoutingModule,
    SharedModule
  ],
  declarations: [VendedorInicioPage]
})
export class VendedorInicioPageModule {}
