import { Routes } from '@angular/router';
import { Register } from './register/register';
import { Login } from './login/login';

export const AUTH_ROUTES: Routes = [
  {
    path: 'register',
    component: Register
  },
  {
    path: 'login',
    component: Login
  }
];
