import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  producto: any;
  vendedorUid: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit() {
    this.afAuth.currentUser
      .then((user) => {
        if (user) {
          this.vendedorUid = user.uid;
          const id = this.route.snapshot.paramMap.get('id');
          if (id) {
            this.cargarProducto(id);
          } else {
            console.error('ID del producto no encontrado en la ruta.');
          }
        } else {
          console.error('No se encontró un usuario autenticado.');
        }
      })
      .catch((error) => {
        console.error('Error al obtener la sesión del usuario:', error);
      });
  }

  cargarProducto(id: string) {
    if (!this.vendedorUid) {
      console.error('UID del vendedor no disponible.');
      return;
    }

    this.firestore
      .collection('users')
      .doc(this.vendedorUid)
      .collection('productos')
      .doc(id)
      .valueChanges()
      .subscribe(
        (data) => {
          if (data) {
            this.producto = data;
          } else {
            console.error('El producto no existe o no tienes permisos para acceder.');
          }
        },
        (error) => {
          console.error('Error al cargar el producto:', error);
        }
      );
  }

  irAEditarProducto() {
    if (!this.producto || !this.producto.id) return;

    this.router.navigate(['/vendedor/formulario/editar', this.producto.id]);
  }

  eliminarProducto() {
    if (!this.producto || !this.producto.id) return;

    this.firestore
      .collection('users')
      .doc(this.vendedorUid!)
      .collection('productos')
      .doc(this.producto.id)
      .delete()
      .then(() => {
        alert('Producto eliminado con éxito');
        this.router.navigate(['/vendedor/inicio']);
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  }

}