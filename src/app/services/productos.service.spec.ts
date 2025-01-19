import { TestBed } from '@angular/core/testing';
import { Imagen } from '../interfaces/Imagen';
import { ProductosService } from './productos.service';
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';

describe('ProductosService', () => {
  let service: ProductosService;
  let Mockhttp : HttpTestingController;
  const obtener = 'http://localhost:9000/imagenes/obtener';
  const crear = 'http://localhost:9000/imagenes/crear';
  const actualizar = 'http://localhost:9000/imagenes/actualizar/:id';
  const eliminar = 'http://localhost:9000/imagenes/eliminar/:id';


  beforeEach(() => {
    TestBed.configureTestingModule({ 
      providers: [
      ProductosService,
      provideHttpClient(),
      provideHttpClientTesting()
    ] });



    service = TestBed.inject(ProductosService);
    Mockhttp = TestBed.inject(HttpTestingController)
  

  });




  it('hacer la peticion GET para mostrar imagen' , ()=>{
    let mockImage =[
      {
        image: 'pueba generica',
        name: 'no c',
        description: 'me quede sin creatividad',
        technique: 'pos agua',
        category: 'nu c'
      },
      {
        image: 'pueba generica',
        name: 'no c',
        description: 'me quede sin creatividad',
        technique: 'pos agua',
        category: 'nu c'
      }
    ]
    
    let mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockImage.length,
      datos: mockImage
    }


    service.getProducts().subscribe(
      (res)=>{
        expect(res).toEqual(mockResponse)
    }
    )

    const req = Mockhttp.expectOne(obtener)
    expect(req.request.method).toBe('GET') 

    req.flush(mockResponse) 
     

})
  









it('hacer la peticion del post imagenes' , ()=>{
  const mockimagenes ={
    image: 'pueba generica',
    name: 'no c',
    description: 'me quede sin creatividad',
    technique: 'pos agua',
    category: 'nu c'
}
  
  const mockResponse = {
    mensaje: 'Se creó la imagen correctamente',
    numeroUsuarios: mockimagenes,
    datos: mockimagenes
  }


  service.createProduct(mockimagenes).subscribe(
    (res) => {
      expect(res).toEqual(mockResponse);
    }
  );

  const req = Mockhttp.expectOne(crear);
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(mockimagenes);

  req.flush(mockResponse);

})












it('hacer la peticion del put imagen' , ()=>{

  const MockId: string = '123';
  const actualizarUrl = `http://localhost:9000/imagenes/actualizar/:id/${MockId}`;

const mockimagenes ={
  image: 'pueba generica',
  name: 'no c',
  description: 'me quede sin creatividad',
  technique: 'pos agua',
  category: 'nu c'
}

const mockResponse = {
  mensaje: 'Se actualizo la imagen correctamente',
  IdUsado: MockId,//borre el length, ya que este Id es un objeto, por lo que no es necesario su uso
  datos: {
    // Aquí deberían ir los datos actualizados del producto
    // Por ejemplo:
    id: MockId,
  image: 'imagen xd',
  name: ':C',
  description: 'aiuda',
  technique: 'D:',
  category: 'a'
}
}


service.updateProduct(MockId, mockimagenes).subscribe(
  (res) => {
    expect(res).toEqual(mockResponse);
  }
);

const req = Mockhttp.expectOne(actualizarUrl); // Utiliza la URL correcta
expect(req.request.method).toBe('PUT');
expect(req.request.body).toEqual(mockimagenes);

req.flush(mockResponse);

})

















it('hacer la peticion del delete imagen' , ()=>{

  const MockId: string = '123';
  const eliminarUrl = `http://localhost:9000/imagenes/eliminar/:id/${MockId}`;

const mockimagenes ={
  image: 'pueba generica',
  name: 'no c',
  description: 'me quede sin creatividad',
  technique: 'pos agua',
  category: 'nu c'
}

const mockResponse = {
  mensaje: 'Se elimino la imagen correctamente',
  IdUsado: MockId,//borre el length, ya que este Id es un objeto, por lo que no es necesario su uso
  datos: { id: MockId,
}
}

service.deleteProduct(MockId).subscribe(
  (res) => {
    expect(res).toBeNull(); // O esperar un valor apropiado según la respuesta real
  }
);

const req = Mockhttp.expectOne(eliminarUrl);
expect(req.request.method).toBe('DELETE');

req.flush(null); // Simula una respuesta sin contenido

})

});
