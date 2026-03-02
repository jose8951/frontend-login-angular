import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { LoginData } from '../models/credenciales';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  // La URL base de tu API en Render
  private baseUrl = 'https://backend-login-ruby.onrender.com';

// 1. Método para el LOGIN (el que ya tenías)
  login(credentials: LoginData): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // 2. Método para CREAR (para el botón de guardar)
  register(userData: LoginData): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, {user:userData});
  }

  // 3. Método para LISTAR (el que te está dando error)
  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/users`);
  }

  updateUser(id:number,userData:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/${id}`,{user:userData});
  }
  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
