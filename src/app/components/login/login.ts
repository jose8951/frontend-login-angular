import { Component, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginData } from '../../models/credenciales';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private authService = inject(Auth);
  private router = inject(Router);

  email = signal('root@test.es');
  password = signal('root1234');
  mensaje = signal('');
  cargando = signal(false);

  onLogin() {
    // 1. Validamos campos básicos
    if (!this.email() || !this.password()) {
      this.mensaje.set('❌ Por favor, rellena todos los campos');
      return;
    }
    // 2. Iniciamos estado de carga y limpiamos mensajes previos
    this.cargando.set(true);
    this.mensaje.set('');

    const credenciales: LoginData = {
      email: this.email(),
      password: this.password(),
    };

    // 3. Llamada al servicio que conecta con Ruby en Render
    this.authService.login(credenciales).subscribe({
      next: (res) => {
        this.cargando.set(false);
        localStorage.setItem('session_token', res.user || res.message);
        localStorage.setItem('current_user',res.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.cargando.set(false);
        // Manejo de errores dinámico desde la respuesta de Ruby
        const msgError = err.error?.error || 'No se pudo conectar con el servidor';
        this.mensaje.set('❌ Error: ' + msgError);
      },
    });
  }
}
