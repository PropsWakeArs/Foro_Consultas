import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstudiantesRoutingModule } from './estudiantes-routing.module';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AnunciosComponent
  ],
  imports: [
    CommonModule,
    EstudiantesRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EstudiantesModule { }
