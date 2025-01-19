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





it('verificar al user si esta logueado' , ()=>{
    localStorage.setItem('token', tokenTest)
    expect(_loginServices.estaLogueado()).toBeTrue

})





it('cierre de sesion' , ()=>{
    _loginServices.CierreSesion()
    expect(localStorage.getItem('token')).toBeNull();


})



  
});
