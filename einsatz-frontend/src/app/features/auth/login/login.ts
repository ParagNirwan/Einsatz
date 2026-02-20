import { Component, inject } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { AuthService } from '../../../core/services/auth.service';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, ReactiveFormsModule, MatButtonModule, MatInputModule,  CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    if (this.loginForm.invalid) return;
    const loginData = this.loginForm.value as any;

    this.authService.login(loginData).subscribe({
      next:(response:any)=>{
        console.log('Login successful, token:', response.token);
        localStorage.setItem('authToken', response.token);
      },
      error:(error)=>{
        console.error('Login failed:', error);
      }
    })

  }

}
