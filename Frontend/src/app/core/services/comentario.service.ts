import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  obtenerComentarios() {
    return this.http.get<Comentario[]>('http://localhost:3000/api/v1/comentario');
  }

  crearComentarios(comentario: Comentario) {
    return this.http.post('http://localhost:3000/api/v1/comentario', comentario);
  }

  eliminarComentario(id: string) {
    return this.http.delete('http://localhost:3000/api/v1/comentario/' + id);
  }
}
