import { Component } from '@angular/core';
import { NavbarComponent } from '../../Componets/navbar/navbar.component';
import { FooterComponent } from '../../Componets/footer/footer.component';

@Component({
  selector: 'app-about-us',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}
