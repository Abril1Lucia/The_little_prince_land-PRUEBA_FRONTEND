import { Component } from '@angular/core';
import { NavbarComponent } from '../../Componets/navbar/navbar.component';
import { FooterComponent } from '../../Componets/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
