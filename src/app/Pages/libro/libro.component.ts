import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../Componets/navbar/navbar.component';
import { FooterComponent } from '../../Componets/footer/footer.component';

@Component({
  selector: 'app-libro',
  imports: [RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})

export class LibroComponent {


}
