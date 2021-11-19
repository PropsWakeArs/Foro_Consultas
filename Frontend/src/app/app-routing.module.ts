import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { Rol } from './core/models/rol.enum';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    canLoad: [AuthGuard],
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module')
      .then(mod => mod.AdministradorModule),
    data: {
      rol: Rol.ADMINISTRADOR
    }
  },
  {
    canLoad: [AuthGuard],
    path: 'estudiante',
    loadChildren: () => import('./modules/estudiantes/estudiantes.module')
      .then(mod => mod.EstudiantesModule),
      data: {
        rol: Rol.ESTUDIANTE
      }
  },
  
  {
    canActivate: [AuthGuard],
    path: '',
    component: SigninComponent
  }

  // {
  //   canLoad: [AuthGuard],
  //   path: 'employees',
  //   loadChildren: () => import('./employees/employees.module')
  //     .then(mod => mod.EmployeesModule),
  //   data: {
  //     profile: Profiles.EMPLOYEE,
  //   }
  // },
  // {
  //   canLoad: [AuthGuard],
  //   path: 'manager',
  //   loadChildren: () => import('./manager/manager.module')
  //     .then(mod => mod.ManagerModule),
  //   data: {
  //     profile: Profiles.MANAGER,
  //   }
  // },
  // {
  //   canLoad: [AuthGuard],
  //   path: 'finances',
  //   loadChildren: () => import('./finances/finances.module')
  //     .then(mod => mod.FinancesModule),
  //   data: {
  //     profile: Profiles.FINANCES,
  //   }
  // },
  // {
  //   canActivate: [AuthGuard],
  //   path: '',
  //   component: SigninComponent,
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
