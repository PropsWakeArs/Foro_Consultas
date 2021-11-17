import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  usuario: User;

  authForm = new FormGroup({
    idBoleta: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
    ]),
    pNombre: new FormControl('', [
      Validators.required,
    ]),
    sNombre: new FormControl(''),
    pApellido: new FormControl('', [
      Validators.required,
    ]),
    sApellido: new FormControl(''),
    carrera: new FormControl('', [
      Validators.required,
    ]),
    passUser: new FormControl('', [
      Validators.required,
    ]),
    passUserRepeat: new FormControl('', [
      Validators.required,
    ]),
    confUser: new FormControl(0),
  });


  constructor(private userService: UserService,
    private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUsuario(this.route.snapshot.params.boleta);
  }

  getUsuario(boleta: string) {
    this.userService.obtenerUsuario(boleta).subscribe(usuario => {
      this.usuario = usuario;
      console.log(usuario);
      this.authForm.get('idBoleta').setValue(usuario.idBoleta);
      this.authForm.get('email').setValue(usuario.email);
      this.authForm.get('pNombre').setValue(usuario.pNombre);
      this.authForm.get('sNombre').setValue(usuario.sNombre);
      this.authForm.get('pApellido').setValue(usuario.pApellido);
      this.authForm.get('sApellido').setValue(usuario.sApellido);
      this.authForm.get('carrera').setValue(usuario.carrera);
    })
  }


  onSubmit(): void {
    if (this.authForm.invalid) {
      if (this.authForm.get('idBoleta').value === '')
        this.authForm.get('idBoleta').setErrors({ requiredField: true })
      if (this.authForm.get('email').value === '')
        this.authForm.get('email').setErrors({ requiredField: true })
      if (this.authForm.get('pNombre').value === '')
        this.authForm.get('pNombre').setErrors({ requiredField: true })
      if (this.authForm.get('pApellido').value === '')
        this.authForm.get('pApellido').setErrors({ requiredField: true })
      if (this.authForm.get('carrera').value === '')
        this.authForm.get('carrera').setErrors({ requiredField: true })
      if (this.authForm.get('passUser').value === '')
        this.authForm.get('passUser').setErrors({ requiredField: true })
      if (this.authForm.get('passUserRepeat').value === '')
        this.authForm.get('passUserRepeat').setErrors({ requiredField: true })
      return;
    }

    if (this.authForm.get('carrera').value === '6') {
      this.authForm.value.confUser = 1;
    }

    delete this.authForm.value.passUserRepeat;

    console.log(this.authForm.value);

    this.userService.editarUsuario(this.route.snapshot.params.boleta, this.authForm.value).subscribe({
      next: res => {
        this.router.navigateByUrl('administrador/usuarios');
      }
    })

  }
}
