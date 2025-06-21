import {
  Component,
  OnInit,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormsModule, // Import FormsModule for ngModel
} from '@angular/forms'; // ReactiveFormsModule might be removed if not used elsewhere
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true, // Ensuring it's standalone
  imports: [CommonModule, FormsModule, RouterLink, NgOptimizedImage], // Changed ReactiveFormsModule to FormsModule
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword implements OnInit {
  // Signals for form fields
  email = signal('');
  submitted = signal(false); // To track form submission for error display

  // Computed signals for validation
  isEmailValid = computed(() => {
    if (!this.email()) return false; // Required check
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()); // Basic email format check
  });

  isFormValid = computed(() => this.isEmailValid());

  // Computed signal for error messages
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

  constructor() {} // FormBuilder is no longer needed

  ngOnInit(): void {
    // No FormGroup initialization needed
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.isFormValid()) {
      const formValue = { email: this.email() };
      console.log('Forgot password form submitted!', formValue);
      // Here, you would typically call an authentication service
      // e.g., this.authService.sendPasswordResetLink(this.forgotPasswordForm.value.email).subscribe(...);
      alert(
        'If an account with this email exists, a password reset link has been sent.'
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
