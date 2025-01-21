import { TestBed } from '@angular/core/testing';
import { Credenciales } from '../interfaces/credenciales';
import { CredencialAdmin } from '../interfaces/credencial-admin';
import { LoginService } from './login.service';
import { provideHttpClient } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';

describe('LoginService', () => {
  let _loginServices : LoginService;
    let _httpMock : HttpTestingController;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
    const urltest = "http://localhost:9000/iniciarSesion/Users"
    const emailTest = "HenryDaniel@gmail.com"
    const passwordTest = "VivaElSancocho123"
    const tokenTest = "t7o0k7e3n5G9e3n5e3r6i1c4o7"




  beforeEach(() => {


    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['info']);



    TestBed.configureTestingModule({   imports: [
      ToastrModule.forRoot() 
    ],
    providers: [
      LoginService,
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: ToastrService, useValue: toastrServiceSpy }
    ]
  }); 

    _loginServices = TestBed.inject(LoginService);
    _httpMock = TestBed.inject(HttpTestingController)

  });

  
  it('Post para inicio de sesion' , ()=>{

    const MockPrueba = {
        mensaje: 'inicio de sesion exitoso',
        token: tokenTest
    }

    _loginServices.IniciodeSesionUser(emailTest, passwordTest).subscribe(
        (res)=>{
            expect(res).toEqual(MockPrueba)
        }
    )

    const peticion = _httpMock.expectOne(urltest)

    expect(peticion.request.method).toBe('POST')


    peticion.flush(MockPrueba)


})




it('token almacenado del localstorage' , ()=>{
    localStorage.setItem('token', tokenTest)//esto es lo q se esta guardando en el localstorage
    expect(_loginServices.obtenerToken()).toBe(tokenTest)

})






it('indicar si el user es admin', () => {
    // Usuario es admin
    const tokenAdmin = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NWE1MWNkOGQ0MTFmMDM0ZmI1ZDQ4YyIsIm5hbWUiOiJTdW4iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzQ2NTMwMTAsImV4cCI6MTczNDY1NjYxMH0.biM4q0wQSNohQg6Ci8pHMKZZ6I2_iG-XYCp04wOqBKc'; // Token de ejemplo con claim "isAdmin" en true
    localStorage.setItem('token', tokenAdmin);
    expect(_loginServices.esAdmin()).toBeTrue();

    // Usuario no es admin
    const tokenUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1wbGVhZG8iLCJpYXQiOjE2NzE0NzY4MDB9.yJ9iMjWeFOm4G9b9aPZXd9s5'; // Token de ejemplo sin claim "isAdmin" o con valor false
    localStorage.setItem('token', tokenUser);
    expect(_loginServices.esAdmin()).toBeFalse();

    // No hay token
    localStorage.removeItem('token');
    expect(_loginServices.esAdmin()).toBeFalse();
  });





it('verificar al user si esta logueado' , ()=>{
    localStorage.setItem('token', tokenTest)
    expect(_loginServices.estaLogueado()).toBeTrue()

})






it('cierre de sesion' , ()=>{
    _loginServices.CierreSesion();
    expect(toastrServiceSpy.info).toHaveBeenCalledWith('D: por que te vas? ;-; ni modo chau... te voy a extrañar we');

    expect(localStorage.getItem('token')).toBeNull(); // Verifica que el token se haya eliminado


})



  
});
