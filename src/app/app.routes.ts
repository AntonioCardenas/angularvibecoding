import { Routes } from '@angular/router';
import { NotFound } from './auth/not-found/not-found';
import { authGuard } from './auth/guards/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Layout } from './core/layout/layout';

// Define the application's routes
export const routes: Routes = [
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'register',
    component: Register,
    title: 'Register',
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard], // Protect the layout and its children
  },
  {
    path: '**', // Wildcard route for 404
    component: NotFound,
    title: '404 - Not Found',
  },
];
