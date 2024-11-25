import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-comprador-vendedor',
  templateUrl: './comprador-vendedor.page.html',
  styleUrls: ['./comprador-vendedor.page.scss'],
})
export class CompradorVendedorPage implements OnInit {
  productos: any[] = [];
  vendedorId: string | undefined;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.vendedorId = this.route.snapshot.paramMap.get('id')!;
    this.cargarProductos();
  }

  cargarProductos() {
    this.firestore.collection('users').doc(this.vendedorId).collection('productos').valueChanges({ idField: 'id' })
      .subscribe((data) => {
        this.productos = data;
      }, (error) => {
        console.error('Error al cargar productos:', error);
      });
  }
}