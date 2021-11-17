import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
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
    private router: Router) { }

  ngOnInit(): void {
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

    this.userService.registrarUsuario(this.authForm.value).subscribe({
      next: res => {
        this.router.navigateByUrl('administrador/usuarios');
      }
    })
  }

}
