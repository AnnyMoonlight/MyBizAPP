import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprador-inicio',
  templateUrl: './comprador-inicio.page.html',
  styleUrls: ['./comprador-inicio.page.scss'],
})
export class CompradorInicioPage implements OnInit {
  vendedores: any[] = [];

  constructor(private firestore: AngularFirestore, private router: Router, private afAuth: AngularFireAuth) {}

  ngOnInit() {
    this.cargarVendedores();
  }

  cargarVendedores() {
    this.firestore
      .collection('users', (ref) => ref.where('role', '==', 'vendedor'))
      .valueChanges({ idField: 'id' })
      .subscribe(
        (data) => {
          this.vendedores = data;
          console.log('Vendedores cargados:', this.vendedores);
        },
        (error) => {
          console.error('Error al cargar vendedores:', error);
        }
      );
  }

  verProductosVendedor(id: string) {
    this.router.navigate(['/comprador/vendedor', id]);
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
}