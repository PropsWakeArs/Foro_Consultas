import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ComentarioService } from 'src/app/core/services/comentario.service';

@Component({
  selector: 'app-comentar',
  templateUrl: './comentar.component.html',
  styleUrls: ['./comentar.component.css']
})
export class ComentarComponent implements OnInit {
  authForm = new FormGroup({
    temaComentario: new FormControl('', [
      Validators.required,
    ]),
    comentario: new FormControl('', [
      Validators.required,
    ]),
  });



  constructor(private comentarioService: ComentarioService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      if (this.authForm.get('comentario').value === '')
        this.authForm.get('comentario').setErrors({ requiredField: true })
      return;
    }

    console.log(this.authForm.value);

    this.comentarioService.crearComentarios(this.authForm.value).subscribe({
      next: res => {
        this.router.navigateByUrl('administrador/anuncios');
      }
    })
  }

  

}
