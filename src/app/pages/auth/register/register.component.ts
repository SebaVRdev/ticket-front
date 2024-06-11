import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formulario: FormGroup = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private userService : UsersService
  ) {}

  onSubmit(): void {
    if (this.formulario.valid) {
      // Aquí puedes manejar la lógica de autenticación, si es necesario
      console.log('Formulario enviado', this.formulario.value);
      const name = this.formulario.value.username;
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;
      const role = "CLIENT_ROLE";
      this.userService.registerClient({name, email, password, role}).subscribe(
        response => {
          console.log(response)
        },
        error => {
          console.log(error.error.message);
        }
      )
    } else {
      console.log('Formulario no válido');
    }
  }
}
