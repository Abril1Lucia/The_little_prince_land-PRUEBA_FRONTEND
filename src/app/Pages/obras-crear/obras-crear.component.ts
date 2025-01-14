import { Component } from '@angular/core';
import { NavbarComponent } from '../../Componets/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../Componets/footer/footer.component';
import {ReactiveFormsModule, FormControl, FormGroup} from "@angular/forms"
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from '../../services/productos.service';
import { Router } from '@angular/router';
import { Imagen } from '../../interfaces/Imagen';

@Component({
  selector: 'app-obras-crear',
  imports: [RouterLink, FooterComponent, NavbarComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './obras-crear.component.html',
  styleUrl: './obras-crear.component.css'
})


export class ObrasCrearComponent {

  _toastrService = inject(ToastrService)
  _Router = inject(Router)
  _imagenes = inject(ProductosService)

  allProducts: Imagen[] = [];


  ObrasFormulario = new FormGroup({
    image: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    technique: new FormControl(''),
    category: new FormControl(''),
  })



  handleSubmit(){
    const image = this.ObrasFormulario.value.image
    const name = this.ObrasFormulario.value.name
    const description = this.ObrasFormulario.value.description
    const technique = this.ObrasFormulario.value.technique
    const category = this.ObrasFormulario.value.category

    let Obranueva: Imagen | null = null;

    if (typeof image === 'string' && typeof name === 'string' && typeof description === 'string' && typeof technique === 'string' && typeof category === 'string')
      {

     Obranueva = {
       image,
       name,
       description,
       technique,
       category
     }

  }

  if (Obranueva) {

    this._imagenes.createProduct(Obranueva).subscribe({

      next: (res: any) => {

        console.log(res)
        if (res) {
          this._toastrService.success('Obras creadas con exito, te quedo muy bonito, comadre o compadre :)')
          this._Router.navigate(['/obras'])
        }
      }


    })


    




  }

}


}