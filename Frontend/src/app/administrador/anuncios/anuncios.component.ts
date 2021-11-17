import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Comentario } from 'src/app/core/models/comentario';
import { User } from 'src/app/core/models/user';
import { ComentarioService } from 'src/app/core/services/comentario.service';
import { AuthService } from 'src/app/auth/auth.service';

interface AuthData {
  isAuthenticated: boolean,
  usuario: User,
}


@Component({
  selector: 'app-anuncios',
  templateUrl: './anuncios.component.html',
  styleUrls: ['./anuncios.component.css']
})
export class AnunciosComponent implements OnInit {
  comentarios: Comentario[];

  signedIn$: BehaviorSubject<AuthData>;


  constructor(private comentarioService: ComentarioService, private authService: AuthService) { 
    this.signedIn$ = this.authService.signedin$;
  }

  ngOnInit(): void {
    this.authService.checkAuth().subscribe(()=>{});
    this.getComentarios();
  }

  getComentarios() {
    this.comentarioService.obtenerComentarios().subscribe(comentarios => {
      this.comentarios = comentarios;
    });
  }

  eliminarComentario(id: string) {
    this.comentarioService.eliminarComentario(id).subscribe(() => {
      this.getComentarios();
    });
  }
}
