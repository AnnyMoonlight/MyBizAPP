import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.page.html',
  styleUrls: ['./producto-form.page.scss'],
})
export class ProductoFormPage implements OnInit {
  producto: any = {
    nombre: '',
    descripcion: '',
    valor: null,
    stock: null,
    imagen: '',
  };
  esEdicion: boolean = false;
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
            this.esEdicion = true;
            this.cargarProducto(id);
          }
        } else {
          alert('Debes iniciar sesión para acceder a esta función.');
          this.router.navigate(['/auth']);
        }
      })
      .catch((error) => {
        console.error('Error al obtener la sesión del usuario:', error);
      });
  }

  cargarProducto(id: string) {
    this.firestore
      .collection('users')
      .doc(this.vendedorUid!)
      .collection('productos')
      .doc(id)
      .valueChanges()
      .subscribe(
        (data) => {
          if (data) {
            this.producto = data;
          } else {
            alert('El producto no existe o no tienes permisos para acceder.');
            this.router.navigate(['/vendedor/inicio']);
          }
        },
        (error) => {
          console.error('Error al cargar el producto:', error);
        }
      );
  }

  async abrirGaleria() {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      if (result && result.base64String) {
        this.producto.imagen = await this.redimensionarImagen(
          `data:image/jpeg;base64,${result.base64String}`,
          800,
          800
        );
      }
    } catch (error) {
      console.error('Error al abrir la galería:', error);
      alert('Ocurrió un error al abrir la galería. Inténtalo nuevamente.');
    }
  }

  async redimensionarImagen(base64: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Calcular las dimensiones
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        // Redimensionar la imagen
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);

        // Convertir a Base64
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // Ajustar calidad al 70%
      };
    });
  }

  guardarProducto() {
    if (!this.vendedorUid) {
      alert('No se pudo verificar la identidad del vendedor.');
      return;
    }

    const productosRef = this.firestore
      .collection('users')
      .doc(this.vendedorUid)
      .collection('productos');

    if (this.esEdicion) {
      productosRef
        .doc(this.producto.id)
        .update(this.producto)
        .then(() => {
          alert('Producto actualizado con éxito');
          this.router.navigate(['/vendedor/inicio']);
        })
        .catch((error) => {
          console.error('Error al actualizar el producto:', error);
        });
    } else {
      const nuevoId = this.firestore.createId();
      productosRef
        .doc(nuevoId)
        .set({ ...this.producto, id: nuevoId })
        .then(() => {
          alert('Producto agregado con éxito');
          this.router.navigate(['/vendedor/inicio']);
        })
        .catch((error) => {
          console.error('Error al agregar el producto:', error);
        });
    }
  }
}