import { ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { EMPTY, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginCredentials } from '../../../core/models/login-credentials';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  processingRequest = false;
  formulario: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {

  }

   onSubmit(): void {

    if (this.formulario.valid) {
      // Aquí puedes manejar la lógica de autenticación, si es necesario
      console.log('Formulario enviado', this.formulario.value);
      const email = this.formulario.value.email;
      const password = this.formulario.value.password;
      this.authService.loginUser({email, password} as LoginCredentials)
      .pipe(
        finalize(() => (this.processingRequest = false)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log("Error en login")
            this.handleUnauThorized()
            return EMPTY;
          }
          throw error;
        })
      ).subscribe();

    } else {
      console.log('Formulario no válido');
    }
  }

  handleUnauThorized() {
    this.formulario.setErrors({ invdalidCredentials: true })
    this.cdr.markForCheck();
  }
}
