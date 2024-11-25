import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent}, 
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)},
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'vendedor-inicio',
    loadChildren: () => import('./vendedor-inicio/vendedor-inicio.module').then( m => m.VendedorInicioPageModule)
  },
  {
    path: 'detalle-producto',
    loadChildren: () => import('./detalle-producto/detalle-producto.module').then( m => m.DetalleProductoPageModule)
  },
  {
    path: 'producto-form',
    loadChildren: () => import('./producto-form/producto-form.module').then( m => m.ProductoFormPageModule)
  },
  {
    path: 'comprador-inicio',
    loadChildren: () => import('./comprador-inicio/comprador-inicio.module').then( m => m.CompradorInicioPageModule)
  },
  {
    path: 'comprador-vendedor',
    loadChildren: () => import('./comprador-vendedor/comprador-vendedor.module').then( m => m.CompradorVendedorPageModule)
  },
  {
    path: 'comprador-producto',
    loadChildren: () => import('./comprador-producto/comprador-producto.module').then( m => m.CompradorProductoPageModule)
  },
  {
    path: 'comprador-producto',
    loadChildren: () => import('./comprador-producto/comprador-producto.module').then( m => m.CompradorProductoPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
