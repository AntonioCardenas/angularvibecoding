import { Routes } from '@angular/router';
import { NotFound } from './auth/not-found/not-found';
import { authGuard } from './auth/guards/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Layout } from './core/layout/layout';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { Home } from './home/home';
import { Data } from './data/data';

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
    path: 'forgot-password',
    component: ForgotPassword,
    title: 'Forgot Password',
  },
  {
    path: '',
    component: Layout,
    canActivate: [authGuard], // Protect the layout and its children
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: Home,
        title: 'Home',
      },
      // Add other protected routes here
      {
        path: 'data',
        component: Data,
        title: 'My Data',
      },
      {
        path: 'profile',
        component: Home, // Placeholder - replace with actual component
        title: 'Profile',
      },
      {
        path: 'settings',
        component: Home, // Placeholder - replace with actual component
        title: 'Settings',
      },
    ],
  },
  {
    path: '**', // Wildcard route for 404
    component: NotFound,
    title: '404 - Not Found',
  },
];
