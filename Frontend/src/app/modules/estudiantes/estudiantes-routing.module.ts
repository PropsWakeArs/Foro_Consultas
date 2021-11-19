import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosComponent } from 'src/app/administrador/anuncios/anuncios.component';
import { ComentarComponent } from 'src/app/administrador/comentar/comentar.component';

const routes: Routes = [
  {
    path: 'anuncios', component: AnunciosComponent,
  },
  {
    path: 'comentar', component: ComentarComponent,
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
