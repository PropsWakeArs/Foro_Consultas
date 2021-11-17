import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAlumnos() {
    return this.http.get<User[]>('http://localhost:3000/api/v1/usuario');
  }

  obtenerUsuario(boleta: string) {
    return this.http.get<User>('http://localhost:3000/api/v1/usuario/' + boleta);
  }

  registrarUsuario(user: User) {
    return this.http.post('http://localhost:3000/api/v1/usuario', user);
  }

  eliminarUsuario(id: string) {
    return this.http.delete('http://localhost:3000/api/v1/usuario/' + id);
  }

  editarUsuario(id: string, usuario: User) {
    return this.http.patch('http://localhost:3000/api/v1/usuario/' + id, usuario);
  }
}
