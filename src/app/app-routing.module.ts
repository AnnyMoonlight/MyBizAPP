import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule) },
  { path: 'vendedor/inicio', loadChildren: () => import('./pages/vendedor-inicio/vendedor-inicio.module').then(m => m.VendedorInicioPageModule) },
  { path: 'vendedor/producto/:id', loadChildren: () => import('./pages/detalle-producto/detalle-producto.module').then(m => m.DetalleProductoPageModule) },
  { path: 'vendedor/formulario/nuevo', loadChildren: () => import('./pages/producto-form/producto-form.module').then(m => m.ProductoFormPageModule) },
  { path: 'vendedor/formulario/editar/:id', loadChildren: () => import('./pages/producto-form/producto-form.module').then(m => m.ProductoFormPageModule) },
  { path: 'comprador/inicio', loadChildren: () => import('./pages/comprador-inicio/comprador-inicio.module').then(m => m.CompradorInicioPageModule) },
  { path: 'comprador/vendedor/:id', loadChildren: () => import('./pages/comprador-vendedor/comprador-vendedor.module').then(m => m.CompradorVendedorPageModule) },
  { path: 'comprador/vendedor/:id/producto/:productoId', loadChildren: () => import('./pages/comprador-producto/comprador-producto.module').then(m => m.CompradorProductoPageModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}