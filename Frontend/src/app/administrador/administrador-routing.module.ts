import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { ComentarComponent } from './comentar/comentar.component';
import { CrearComponent } from './crear/crear.component';
import { EditarComponent } from './editar/editar.component';
import { UserIndexComponent } from './user-index/user-index.component';
const routes: Routes = [
  {
    path: 'anuncios', component: AnunciosComponent,
  },
  {
    path: 'comentar', component: ComentarComponent,
  },  
  {
    path: 'usuarios', component: UserIndexComponent,
  },
  {
    path: 'registrar_usuario', component: CrearComponent,
  }, 
  {
    path: 'editar_usuario/:boleta', component: EditarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
