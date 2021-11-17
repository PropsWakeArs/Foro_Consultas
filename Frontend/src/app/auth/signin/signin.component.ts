import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    usuario: new FormControl('',
      [
        Validators.required,
      ]),
    password: new FormControl('',
      [
        Validators.required,
      ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

  }


  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signin(this.authForm.value).subscribe({
      next: res => {
        if (res.usuario) {
          this.router.navigateByUrl('/administrador/anuncios')
        } 
      },
      error: err => {
        this.authForm.setErrors({ credentials: true })
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true })
        }
      }
    }
    );
  }
}
