import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario';
import { LoginData } from '../../models/credenciales';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule,Navbar,RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
   private authService = inject(Auth);

  // Variables para el formulario y la lista
  nuevoUsuario: LoginData = { email: '', password: '' };
  usuarios = signal<Usuario[]>([]);
  mensajeForm = signal('');
  cargando = signal(true);
  usuarioEditando = signal<number | null>(null);
  emailEditando = signal('');
  modoEdicion = signal(false);
usuarioSeleccionado = signal<Usuario | null>(null);


ngOnInit(): void {
 
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargando.set(true);
    this.authService.getUsers().subscribe({
      next: (res) => {
        this.usuarios.set(res);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al traer usuarios', err);
        this.cargando.set(false);
      },
    });
  }

  crearUsuario() {
    this.authService.register(this.nuevoUsuario).subscribe({
      next: (rest) => {
        this.mensajeForm.set('✅ Usuario guardado correctamente');
        this.usuarios.update((list) => [...list, rest]); // Añade directamente sin esperar
        this.nuevoUsuario = { email: '', password: '' }; // Limpiar formulario

        setTimeout(() => this.mensajeForm.set(''), 3000);
      },
      error: (err) => this.mensajeForm.set('❌ Error: ' + err.message),
    });
  }

  editarUsuario(user: Usuario) {
    this.usuarioEditando.set(user.id);
    this.emailEditando.set(user.email);
  }

  guardarEdicion(user: Usuario) {
    this.authService.updateUser(user.id, { email: this.emailEditando() }).subscribe({
      next: (res) => {
        this.usuarios.update((list) => list.map((u) => (u.id === user.id ? res : u)));
        this.usuarioEditando.set(null);
        this.mensajeForm.set('✅ Usuario actualizado correctamente');
        setTimeout(() => this.mensajeForm.set(''), 3000);
      },
      error: (err) => this.mensajeForm.set('❌ Error: ' + err.message),
    });
  }
  cancelarEdicion() {
    this.usuarioEditando.set(null);
  }

  eliminarUsuario(user: Usuario) {
    if (!confirm(`¿Seguro que quieres eliminar a ${user.email}?`)) return;
    this.authService.deleteUser(user.id).subscribe({
      next: () => {
        this.usuarios.update((list) => list.filter((u) => u.id !== user.id));
        this.mensajeForm.set('✅ Usuario eliminado correctamente');
        setTimeout(() => this.mensajeForm.set(''), 3000);
      },
      error: (err) => this.mensajeForm.set('❌ Error: ' + err.message),
    });
  }


  

  toggleActivo(user: Usuario) {
  this.authService.updateUser(user.id, { active: !user.active }).subscribe({
    next: (res) => {
      this.usuarios.update(list => list.map(u => u.id === user.id ? res : u));
      this.mensajeForm.set(`✅ Usuario ${res.active ? 'activado' : 'desactivado'}`);
      setTimeout(() => this.mensajeForm.set(''), 3000);
    },
    error: (err) => this.mensajeForm.set('❌ Error: ' + err.message)
  });
}


seleccionarUsuario(user: Usuario) {
  this.modoEdicion.set(true);
  this.usuarioSeleccionado.set(user);
  this.nuevoUsuario = { email: user.email, password: '' };
}

cancelarModoEdicion() {
  this.modoEdicion.set(false);
  this.usuarioSeleccionado.set(null);
  this.nuevoUsuario = { email: '', password: '' };
}

actualizarUsuario() {
  const user = this.usuarioSeleccionado();
  if (!user) return;
  this.authService.updateUser(user.id, this.nuevoUsuario).subscribe({
    next: (res) => {
      this.usuarios.update(list => list.map(u => u.id === user.id ? res : u));
      this.mensajeForm.set('✅ Usuario actualizado correctamente');
      this.cancelarModoEdicion();
      setTimeout(() => this.mensajeForm.set(''), 3000);
    },
    error: (err) => this.mensajeForm.set('❌ Error: ' + err.message)
  });
}
}