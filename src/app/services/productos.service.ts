import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener todos los productos de un vendedor
  getProductosPorVendedor(vendedorUid: string): Observable<Producto[]> {
    return this.firestore
      .collection<Producto>('users')
      .doc(vendedorUid)
      .collection<Producto>('productos')
      .valueChanges({ idField: 'id' });
  }

  // Obtener un producto por su ID
  getProducto(vendedorUid: string, productoId: string): Observable<Producto | undefined> {
    return this.firestore
      .collection('users')
      .doc(vendedorUid)
      .collection<Producto>('productos')
      .doc(productoId)
      .valueChanges();
  }

  // Crear un nuevo producto
  crearProducto(vendedorUid: string, producto: Producto): Promise<void> {
    const productoId = this.firestore.createId();
    return this.firestore
      .collection('users')
      .doc(vendedorUid)
      .collection('productos')
      .doc(productoId)
      .set({ ...producto, id: productoId });
  }

  // Editar un producto existente
  editarProducto(vendedorUid: string, productoId: string, producto: Partial<Producto>): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(vendedorUid)
      .collection('productos')
      .doc(productoId)
      .update(producto);
  }

  // Eliminar un producto
  eliminarProducto(vendedorUid: string, productoId: string): Promise<void> {
    return this.firestore
      .collection('users')
      .doc(vendedorUid)
      .collection('productos')
      .doc(productoId)
      .delete();
  }
}
