import { Component } from '@angular/core';
import { NavbarComponent } from '../../Componets/navbar/navbar.component';
import { TarjetaProductoComponent } from '../../Componets/tarjeta-producto/tarjeta-producto.component';
import { FooterComponent } from '../../Componets/footer/footer.component';
import { ObrasCrearComponent } from '../obras-crear/obras-crear.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-obras',
  imports: [NavbarComponent, TarjetaProductoComponent, FooterComponent, ObrasCrearComponent, RouterLink],
  templateUrl: './obras.component.html',
  styleUrl: './obras.component.css'
})
export class ObrasComponent {

}
