import { Routes } from '@angular/router';
import { NotFound } from './auth/not-found/not-found';
import { authGuard } from './auth/guards/auth-guard';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { UserProfile } from './auth/user-profile/user-profile';

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
    path: 'profile',
    component: UserProfile,
    canActivate: [authGuard], // Protect this route
    title: 'User Profile',
  },
  {
    path: '',
    redirectTo: '/data', // Default route redirects to data
    pathMatch: 'full',
  },
  {
    path: '**', // Wildcard route for 404
    component: NotFound,
    title: '404 - Not Found',
  },
];
