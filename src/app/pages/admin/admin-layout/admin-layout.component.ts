import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet , HeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {

}
