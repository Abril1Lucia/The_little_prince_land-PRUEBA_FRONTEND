import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagen } from '../interfaces/Imagen';


@Injectable({
  providedIn: 'root'
})


export class ProductosService {


  private _httpClient = inject(HttpClient); 

  API_URL_GET = 'http://localhost:9000/imagenes/obtener';
  API_URL_POST = 'http://localhost:9000/imagenes/crear';
  API_URL_PUT = 'http://localhost:9000/imagenes/actualizar/:id';
  API_URL_DELETE = 'http://localhost:9000/imagenes/eliminar/:id';


  
 //obtener datos
 getProducts() {
  return this._httpClient.get(this.API_URL_GET);
}

//crear datos
createProduct(producto: Imagen) {
  return this._httpClient.post(this.API_URL_POST, producto);
}

//modificar datos
updateProduct(id: string | undefined, producto: Imagen
) {
  return this._httpClient.put(`${this.API_URL_PUT}/${id}`, producto);
}

//eliminar
deleteProduct(id: string | undefined) {
  return this._httpClient.delete(`${this.API_URL_DELETE}/${id}`);
}
}
