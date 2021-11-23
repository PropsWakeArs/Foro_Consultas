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
      Validators.pattern("[0-9]*"),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    pNombre: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*"),
    ]),
    sNombre: new FormControl('',[
      Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*"),
    ]),
    pApellido: new FormControl('', [
      Validators.required,
      Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*"),

    ]),
    sApellido: new FormControl('',[
      Validators.pattern("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]*"),
    ]),
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
      if(this.authForm.get('idBoleta').hasError('pattern'))
        this.authForm.get('idBoleta').setErrors({msg:'Caracteres no validos'})
      if (this.authForm.get('email').hasError('required'))
        this.authForm.get('email').setErrors({ msg: 'Por favor ingrese el correo.' })
      if (this.authForm.get('email').hasError('email'))
        this.authForm.get('email').setErrors({ msg: 'Por favor ingrese un correo valido.' })
        if (this.authForm.get('pNombre').hasError('required'))
        this.authForm.get('pNombre').setErrors({ msg: 'Por favor ingrese el primer nombre.' })
      if (this.authForm.get('pNombre').hasError('pattern'))
        this.authForm.get('pNombre').setErrors({ msg: 'Por favor ingrese un nombre valido.' })
      if (this.authForm.get('sNombre').hasError('pattern'))
        this.authForm.get('sNombre').setErrors({ msg: 'Por favor ingrese un nombre valido.' })
      if (this.authForm.get('pApellido').hasError('required'))
        this.authForm.get('pApellido').setErrors({ msg: 'Por favor ingrese el primer apellido.' })
      if (this.authForm.get('pApellido').hasError('pattern'))
        this.authForm.get('pApellido').setErrors({ msg: 'Por favor ingrese un apellido valido.' })
      if (this.authForm.get('sApellido').hasError('pattern'))
        this.authForm.get('sApellido').setErrors({ msg: 'Por favor ingrese un apellido valido.' })
      if (this.authForm.get('carrera').value === '')
        this.authForm.get('carrera').setErrors({ requiredField: true })
      if (this.authForm.get('passUser').value === '')
        this.authForm.get('passUser').setErrors({ requiredField: true })
      if (this.authForm.get('passUserRepeat').value === '')
        this.authForm.get('passUserRepeat').setErrors({ requiredField: true })
      return;
    }

    if (this.authForm.get('passUser').value !==  this.authForm.get('passUserRepeat').value) {
      this.authForm.get('passUser').setErrors({notMatch: true})
      this.authForm.get('passUserRepeat').setErrors({ notMatch: true })
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
