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
      Validators.maxLength(200)
    ]),
  });



  constructor(private comentarioService: ComentarioService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      if (this.authForm.get('comentario').hasError('required'))
        this.authForm.get('comentario').setErrors({ msg: 'Por favor ingrese el comentario.' })
      if (this.authForm.get('comentario').hasError('maxlength'))
        this.authForm.get('comentario').setErrors({ msg: 'La longitud debe ser menor a 200 caracteres' })
      if (this.authForm.get('temaComentario').value === '')
        this.authForm.get('temaComentario').setErrors({ requiredField: true })
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
