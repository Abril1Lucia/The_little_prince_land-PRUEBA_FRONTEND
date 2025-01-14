import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';
import { Credenciales } from '../interfaces/credenciales';
import { CredencialAdmin } from '../interfaces/credencial-admin';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //inyecta dependencias we
private _httpClient = inject(HttpClient)
private _router = inject(Router)
public  _toastrService = inject(ToastrService);

//se saca del backend y el postman we
private URL_LOGIN_USER = "http://localhost:9000/iniciarSesion/Users"
private URL_LOGIN_ADMIN ='http://localhost:9000/iniciarSesion/Admin'
//iniciar sesion peticion de POST 

IniciodeSesionUser(credencialesdeingreso:Credenciales){
  return this._httpClient.post(this.URL_LOGIN_USER,credencialesdeingreso)
}

InicioSesionAdmin(credencialesdeingreso:CredencialAdmin){
  return this._httpClient.post(this.URL_LOGIN_ADMIN,credencialesdeingreso)
}



//obtener token we

obtenerToken(){
  //mira we, si hay token, se logro, pero si no hay... valio vrg
  return localStorage.getItem('token');
}

//valorar admin o no we

esAdmin (){
  const token = this.obtenerToken();

  if (token) {
    const decodificado: any = jwtDecode(token);

    return decodificado.isAdmin ? true : false;

  }else{
    console.error('')
    return false
  }
}

//redireccion al admin 

redireccionar(){
  // Si es admin -> redireciona a panel de control
  if(this.esAdmin()){
    this._router.navigate(['/admin']);

  }else {
    // Si no -> redireciona a la página de inicio
    this._router.navigate(['/']);
  }
}


//se pudo o no se pudo we inicio de sesion we

estaLogueado(){
  return this.obtenerToken()? true : false;
}


//nomas we cerrar sesion we
CierreSesion(){
    // mensaje del usuario
    this._toastrService.info('D: por que te vas? ;-; ni modo chau... te voy a extrañar we');
    // nos elimina el token del local Storage
    localStorage.removeItem('token');
    //redirecciona a la página de inicio después de cerrar sesión
    this._router.navigate(['/']); 
}
}

//LEGION DEL
//SANCOCHO
//>:D