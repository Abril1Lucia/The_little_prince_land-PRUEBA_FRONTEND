import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Imagen } from '../../interfaces/Imagen';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-tarjeta-producto',
  standalone:true,
  imports: [NgFor],
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.css'
})



export class TarjetaProductoComponent {

  _productsService = inject(ProductosService);
  _toastrService = inject(ToastrService)

  allProducts : Imagen[] = [];

  obtenerProductos(){

    this._productsService.getProducts().subscribe({
      next: (res:any) =>{
        //sale bien 
        this.allProducts = res.datos;
        console.log(this.allProducts)
        
      },
      error: (error: any) =>{
        //salio mal we

        console.log(error)
      }

    }
  )


  }

  ngOnInit(){
    this.obtenerProductos();
  }

}
