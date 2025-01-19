import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Users } from '../interfaces/users';
import { UsuariosService } from './usuarios.service';
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting} from '@angular/common/http/testing';



describe('UsuariosService', () => {
  let service: UsuariosService;
    let Mockhttp : HttpTestingController;
    const urltest = "http://localhost:9000/usuarios/obtener"
    const urlPost = "http://localhost:9000/usuarios/crear"

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports: [HttpClientTestingModule], 
       providers: [UsuariosService,
        provideHttpClient(),
      provideHttpClientTesting()
       ] });
    service = TestBed.inject(UsuariosService);
    Mockhttp = TestBed.inject(HttpTestingController)
  });

  afterAll(()=>{
    Mockhttp.verify()
  })

  it('hacer la peticion del get para mostrar users' , ()=>{
    const mockUsers =[
      {
        fullName:'Sunny daily', email: 'mequieroiradormir@gmail.com', password: 'wenasNochesmini'
      },
      {
        fullName:'lazaro lucky', email: 'yaestoyhastalamadre@gmail.com', password: 'wenasNochesDisy'
      }
    ]
    
    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    }


    service.getUsuarios().subscribe(

      (res)=>{
        expect(res).toEqual(mockResponse)
    }
    )

    const req = Mockhttp.expectOne(urltest)
    expect(req.request.method).toBe('GET')

    req.flush(mockResponse)

})








it('hacer la peticion del post users' , ()=>{
  const mockusuarios ={
    image: 'string',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone: '1234567890'
}
  
  const mockResponse = {
    mensaje: 'Se creó el usuario correctamente',
    numeroUsuarios: mockusuarios,//borre el length, ya que este ususario es un objeto, por lo que no es necesario su uso
    datos: mockusuarios
  }


  service.postUsuarios(mockusuarios).subscribe(
    (res) => {
      expect(res).toEqual(mockResponse);
    }
  );

  const req = Mockhttp.expectOne(urlPost);
  expect(req.request.method).toBe('POST');
  expect(req.request.body).toEqual(mockusuarios);

  req.flush(mockResponse);

})


});
