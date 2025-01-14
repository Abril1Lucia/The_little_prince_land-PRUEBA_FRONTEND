import { Component, inject } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { Imagen } from '../../interfaces/Imagen';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  _dataService = inject(ProductosService);
  allProducts: Imagen[] = [];


  name: string = '';
  description: string = '';
  technique: string = '';
  category: string = '';
  image: string = '';
  showDiv: boolean = false;
  editMode: boolean = false;  
  editProductId: string | undefined | null= null;


  obtenerDatos() {
    this._dataService.getProducts().subscribe({
      next: (res: any) => {
        console.log('res', res);
        this.allProducts = res;
        // console.log(this.allProducts);
      },
      error: (error) => {
        console.error('Hubo un error', error);
      }
    });
  }

  crearDatos(){
    if (this.name === '' || this.image === '' || this.description === '' || this.category === '' || this.technique === '') {
      alert('Ingrese todos los campos');
    } else{

      const ObraNueva: Imagen = {
        name: this.name,
        image: this.image,
        description: this.description,
        category: this.category,
        technique: this.technique,
      };


      this._dataService.createProduct(ObraNueva).subscribe({
        next: (res: any) => {
          if (res) {
            console.log('res', res);
            this.obtenerDatos();
          } else {
            console.error('Hubo un error');
          }
        },
        error: (error) => {
          console.error('Hubo un error', error);
        }
      });

  }

}



  //modificar productos
  identificarId(id: string | undefined ) {
    this.editProductId = id;
    this.editMode = true;
    this.showDiv = true;
    console.log(this.editProductId);
  }



  

  modificarProducto() {
    console.log('Entré');
    console.log(this.editProductId, this.name, this.image, this.description, this.technique, this.category );

    if (!this.name || !this.image || this.description || this.technique || this.category) {
        alert('Ingrese todos los campos');
    } else if (this.editProductId) {
        const ObraActualizada: Imagen = {
          name: this.name,
          image: this.image,
          description: this.description,
          category: this.category,
          technique: this.technique,
        };

        this._dataService.updateProduct(this.editProductId, ObraActualizada).subscribe({
            next: (res: any) => {
                if (res) {
                    console.log('res', res);
                    this.obtenerDatos();
                    this.toggleDiv();
                } else {
                    console.error('Hubo un error');
                }
            },
            error: (error) => {
                console.error('Hubo un error', error);
            }
        });
    }
}




borrarProducto(id: string) {
  console.log('Producto a borrar:', id);

  this._dataService.deleteProduct(id).subscribe({
      next: (res: any) => {
          if (res) {
              console.log('res', res);
              this.obtenerDatos();
          } else {
              console.error('Hubo un error');
          }
      },
      error: (err) => {
          console.error('Hubo un error', err);
      }
  });
}


toggleDiv() {
  this.showDiv = !this.showDiv;
  if (!this.showDiv) {
    this.name = '';
    this.description = '';
    this.technique = '';
    this.category = '';
    this.image = '';
    this.showDiv = false;
    this.editMode = false;  
    this.editProductId= null;
  }
}

limpiarCampos() {
  this.name === '';
  this.image === '';
  this.description === '';
  this.technique === '';
  this.category === '';
}

ngOnInit() {
  this.obtenerDatos();

}

}