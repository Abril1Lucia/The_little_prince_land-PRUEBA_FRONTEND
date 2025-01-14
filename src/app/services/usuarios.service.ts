import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

private _httpClient = inject(HttpClient);

private URL_USERS = 'http://localhost:9000/usuarios';

postUsuarios(user :Users){

  return this._httpClient.post( this.URL_USERS + '/crear', user );
}

getUsuarios(){
  return this._httpClient.get( this.URL_USERS + '/obtener')
}
}
