// @context: Standalone Angular 20 login component using signals for reactive form state, validation, and error handling.

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
import { Auth, LoginCredentials } from '../services/auth';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true, // Assuming this is a standalone component
  imports: [RouterLink, FormsModule], // Changed ReactiveFormsModule to FormsModule
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  private auth = inject(Auth);

  // Signals for form fields
  email = signal('');
  password = signal('');
  rememberMe = signal(false);
  submitted = signal(false); // To track form submission for error display

  // Computed signals for validation
  isEmailValid = computed(() =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())
  );
  isPasswordValid = computed(() => this.password().length > 0);

  isFormValid = computed(() => this.isEmailValid() && this.isPasswordValid());

  // Computed signals for error messages
  emailError = computed(() => {
    if (!this.email() && this.submitted()) return 'Email is required.';
    if (this.email() && !this.isEmailValid() && this.submitted())
      return 'Please enter a valid email address.';
    return '';
  });

  passwordError = computed(() => {
    if (!this.password() && this.submitted()) return 'Password is required.';
    return '';
  });

  constructor() {} // FormBuilder is no longer needed here

  ngOnInit(): void {
    // No FormGroup initialization needed
  }

  onLogin(): void {
    this.submitted.set(true);
    if (this.isFormValid()) {
      const credentials: LoginCredentials = {
        email: this.email(),
        password: this.password(),
      };

      this.auth.login(credentials).catch((error) => {
        console.error('Login failed:', error);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
