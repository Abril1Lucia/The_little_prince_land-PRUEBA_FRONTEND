import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms"
import { Users } from '../../interfaces/users';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'

})


export class RegistroComponent {


_toastrService = inject(ToastrService)
_UserService = inject(UsuariosService)
_Router = inject(Router)


  formularioRegistro = new FormGroup({
    image: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    telefono: new FormControl(''),
  })

  handleSubmit(){
    const image = this.formularioRegistro.value.image
    const fullName = this.formularioRegistro.value.name
    const email = this.formularioRegistro.value.email
    const password = this.formularioRegistro.value.password
    const phone = this.formularioRegistro.value.telefono


    let nuevoUsuario: Users | null = null;

    
    if (typeof image === 'string' && typeof fullName === 'string' && typeof email === 'string' && typeof password === 'string' && typeof phone === 'string')
       {

      nuevoUsuario = {
        image,
        fullName,
        email,
        password,
        phone
      }


    }

    if (nuevoUsuario) {

      this._UserService.postUsuarios(nuevoUsuario).subscribe({

        next: (res: any) => {

          console.log(res)
          if (res) {
            this._toastrService.success('Usuario creado con exito')
            this._Router.navigate(['/login'])
          }


        }


      })

    }
    
  }



}
