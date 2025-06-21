import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../shared/services/notification';

export interface User {
  uid: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private router = inject(Router);
  private notification = inject(NotificationService);

  // Use a BehaviorSubject to hold the current user state
  private userState$ = new BehaviorSubject<User | null>(null);

  constructor() {
    // Check for a logged-in user in localStorage on service initialization
    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      this.userState$.next(JSON.parse(storedUser));
    }
  }

  getUserState() {
    return this.userState$.asObservable();
  }

  getCurrentUser(): User | null {
    return this.userState$.getValue();
  }

  async login(credentials: LoginCredentials): Promise<void> {
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, you'd validate the password. Here, we just mock success.
    const mockUser: User = {
      uid: 'mock-user-id-' + Date.now(),
      email: credentials.email,
    };

    // Store user in localStorage to persist session
    localStorage.setItem('activeUser', JSON.stringify(mockUser));
    this.userState$.next(mockUser);

    this.notification.showSuccess('Logged in successfully!');
    this.router.navigate(['/home']);
  }

  async register(credentials: RegisterCredentials): Promise<void> {
    // Mock API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser: User = {
      uid: 'mock-user-id-' + Date.now(),
      email: credentials.email,
    };

    // Log the user in immediately after registration
    localStorage.setItem('activeUser', JSON.stringify(mockUser));
    this.userState$.next(mockUser);

    this.notification.showSuccess('Registration successful!');
    this.router.navigate(['/home']);
  }

  async logout(): Promise<void> {
    // Remove user from localStorage and update subject
    localStorage.removeItem('activeUser');
    this.userState$.next(null);

    this.notification.showSuccess('Logged out.');
    this.router.navigate(['/login']);
  }
}
