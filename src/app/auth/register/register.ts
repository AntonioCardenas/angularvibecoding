// @context: Standalone Angular 20 register component using signals for reactive form state, validation, and error handling.

import {
  Component,
  OnInit,
  signal,
  computed,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import {
  FormsModule, // Import FormsModule for ngModel
} from '@angular/forms'; // ReactiveFormsModule might be removed if not used elsewhere
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Auth, RegisterCredentials } from '../services/auth';

@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true, // Marking as standalone
  imports: [FormsModule, RouterLink, NgOptimizedImage, MatIconModule], // Changed ReactiveFormsModule to FormsModule
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register implements OnInit {
  private auth = inject(Auth);

  // Signals for form fields
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  showPassword = signal(false);
  submitted = signal(false); // To track form submission for error display

  // Computed signals for validation
  isEmailValid = computed(() => {
    if (!this.email()) return false; // Required
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()); // Basic email format
  });
  isPasswordValid = computed(() => {
    if (!this.password()) return false; // Required
    return this.password().length >= 6; // MinLength
  });
  isConfirmPasswordValid = computed(() => !!this.confirmPassword()); // Required
  doPasswordsMatch = computed(() => this.password() === this.confirmPassword());

  isFormValid = computed(
    () =>
      this.isEmailValid() &&
      this.isPasswordValid() &&
      this.isConfirmPasswordValid() &&
      this.doPasswordsMatch()
  );

  // Computed signals for error messages
  emailError = computed(() => {
    if (this.submitted() && !this.email()) return 'Email is required.';
    if (
      this.submitted() &&
      this.email() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())
    ) {
      return 'Please enter a valid email address.';
    }
    return '';
  });

  passwordError = computed(() => {
    if (this.submitted() && !this.password()) return 'Password is required.';
    if (this.submitted() && this.password() && this.password().length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  });

  confirmPasswordError = computed(() => {
    if (this.submitted() && !this.confirmPassword())
      return 'Confirming password is required.';
    if (
      this.submitted() &&
      this.confirmPassword() &&
      !this.doPasswordsMatch()
    ) {
      return 'Passwords do not match.';
    }
    return '';
  });

  constructor() {} // FormBuilder is no longer needed

  ngOnInit(): void {
    // No FormGroup initialization needed
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  // Renamed from onLogin to onRegister for clarity
  onRegister(): void {
    this.submitted.set(true);
    if (this.isFormValid()) {
      const credentials: RegisterCredentials = {
        email: this.email(),
        password: this.password(),
      };

      this.auth.register(credentials).catch((error) => {
        console.error('Registration failed:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
