import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {
  alumnos: User[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getAlumnos();
  }

  getAlumnos() {
    this.userService.getAlumnos().subscribe(alumnos => {
      this.alumnos = alumnos;
      console.log(alumnos)
    })
  }

  eliminarUsuario(id: string) {
    this.userService.eliminarUsuario(id).subscribe(() => {
      this.getAlumnos();
    });
  }

}
