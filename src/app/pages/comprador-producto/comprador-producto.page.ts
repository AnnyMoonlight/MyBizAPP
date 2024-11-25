import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-comprador-producto',
  templateUrl: './comprador-producto.page.html',
  styleUrls: ['./comprador-producto.page.scss'],
})
export class CompradorProductoPage implements OnInit {
  producto: any;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    const vendedorId = this.route.snapshot.paramMap.get('id');
    const productoId = this.route.snapshot.paramMap.get('productoId');
  
    if (vendedorId && productoId) {
      this.cargarProducto(vendedorId, productoId);
    } else {
      console.error('No se encontraron los IDs requeridos.');
    }
  }

  cargarProducto(vendedorId: string, productoId: string) {
    this.firestore
      .collection('users')
      .doc(vendedorId)
      .collection('productos')
      .doc(productoId)
      .valueChanges()
      .subscribe(
        (data) => {
          this.producto = data;
          console.log('Producto cargado:', this.producto);
        },
        (error) => {
          console.error('Error al cargar producto:', error);
        }
      );
  }
}