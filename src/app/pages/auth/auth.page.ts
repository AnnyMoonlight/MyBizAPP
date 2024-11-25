import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  authMode: 'login' | 'register' = 'login';
  email: string = '';
  password: string = '';
  username: string = '';
  role: 'comprador' | 'vendedor' = 'comprador';

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Validar formato del correo
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Método para iniciar sesión
  async onLogin() {
    try {
      console.log('Iniciando sesión...');
      if (!this.isValidEmail(this.email)) {
        alert('Por favor, ingresa un correo válido.');
        return;
      }

      // Intentar iniciar sesión en Firebase
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      console.log('Inicio de sesión exitoso:', userCredential);

      const uid = userCredential.user?.uid;
      if (!uid) {
        alert('Error al obtener la identificación del usuario.');
        return;
      }

      // Guardar el UID en localStorage
      localStorage.setItem('vendedorUid', uid);
      console.log('UID guardado en localStorage:', uid);

      // Obtener datos del usuario desde Firestore
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      const userData = userDoc?.data() as any;

      if (!userData) {
        alert('No se pudo recuperar la información del usuario.');
        return;
      }

      console.log('Datos del usuario:', userData);

      // Redirigir según el rol del usuario
      if (userData.role === 'vendedor') {
        console.log('Redirigiendo al inicio del vendedor...');
        this.router.navigate(['/vendedor/inicio']);
      } else if (userData.role === 'comprador') {
        console.log('Redirigiendo al inicio del comprador...');
        this.router.navigate(['/comprador/inicio']);
      } else {
        alert('Rol de usuario no válido.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Verifica tus credenciales.');
    }
  }

  // Método para registrar un nuevo usuario
  async onRegister() {
    try {
      console.log('Iniciando el registro...');
      if (this.password.length < 6) {
        alert('La contraseña debe tener al menos 6 caracteres.');
        return;
      }

      if (!this.isValidEmail(this.email)) {
        alert('Por favor, ingresa un correo válido.');
        return;
      }

      console.log('Creando usuario en Firebase Authentication...');
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      const uid = userCredential.user?.uid;

      if (!uid) {
        alert('Error al obtener el UID del usuario.');
        return;
      }

      console.log('Guardando información adicional en Firestore...');
      await this.firestore.collection('users').doc(uid).set({
        email: this.email,
        username: this.username,
        role: this.role,
        createdAt: new Date(),
      });

      console.log('Usuario registrado exitosamente.');
      alert('Registro completado.');
      this.router.navigate([this.role === 'vendedor' ? '/vendedor/inicio' : '/comprador/inicio']);
    } catch (error) {
      console.error('Error al registrarse:', error);
      if (error instanceof Error) {
        if (error.message.includes('permissions') || error.message.includes('PERMISSION_DENIED')) {
          alert('Error: No tienes permisos suficientes para realizar esta operación.');
        } else {
          alert(`Error al registrarse: ${error.message}`);
        }
      } else {
        alert('Ocurrió un error inesperado. Inténtalo de nuevo.');
      }
    }
  }
}