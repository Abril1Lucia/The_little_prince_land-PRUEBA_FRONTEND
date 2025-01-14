import { Component } from '@angular/core';
import { Users } from '../../../interfaces/users';
import { UsuariosService } from '../../../services/usuarios.service';
import { NgFor } from '@angular/common';
import { inject } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  _dataService = inject(UsuariosService)
  allUsers: Users[] = [];

  obtenerDatos() {
    this._dataService.getUsuarios().subscribe(
      {
        next: (res: any) => {
          // console.log(res.datos);
          this.allUsers = res.datos;
          console.log(this.allUsers)

        },
      }
    );
  }

  modificarUsuario(id: string){
    console.log('id del usuario para actualizar : ' +id);
  }

  borrarUsuario(id: string){
    console.log('id del usuario a eliminar : ' +id);
  }

  ngOnInit() {
    this.obtenerDatos(); 
  }

}
