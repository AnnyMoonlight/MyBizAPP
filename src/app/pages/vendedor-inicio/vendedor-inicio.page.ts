import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendedor-inicio',
  templateUrl: './vendedor-inicio.page.html',
  styleUrls: ['./vendedor-inicio.page.scss'],
})
export class VendedorInicioPage implements OnInit {
  productos: any[] = [];
  uidVendedor: string = '';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.uidVendedor = user.uid;
        console.log('UID del vendedor:', this.uidVendedor);
        this.cargarProductos();
      } else {
        console.log('Usuario no autenticado, redirigiendo a Auth');
        this.router.navigate(['/auth']);
      }
    });
  }

  cargarProductos() {
    if (!this.uidVendedor) {
      console.error('UID del vendedor no encontrado.');
      return;
    }

    this.firestore
      .collection('users')
      .doc(this.uidVendedor)
      .collection('productos')
      .valueChanges({ idField: 'id' })
      .subscribe(
        (data) => {
          this.productos = data;
          console.log('Productos cargados:', this.productos);
        },
        (error) => {
          console.error('Error al cargar los productos:', error);
        }
      );
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      console.log('Sesión cerrada correctamente.');
      this.router.navigate(['/auth']);
    }).catch((error) => {
      console.error('Error al cerrar sesión:', error);
      alert('Error al cerrar sesión. Por favor, inténtalo nuevamente.');
    });
  }

  irAFormularioNuevo() {
    this.router.navigate(['/vendedor/formulario/nuevo']);
  }
}