import {
  Component,
  ChangeDetectionStrategy,
  computed,
  signal,
  input,
  output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Example interfaces for type safety
interface User {
  id: string;
  name: string;
  email: string;
}

interface FormData {
  name: string;
  email: string;
}

@Component({
  selector: 'app-example-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="example-container">
      <!-- Using native control flow instead of *ngIf -->
      @if (isVisible()) {
      <h2>{{ title() }}</h2>
      }

      <!-- Using native control flow for loops -->
      @for (user of users(); track user.id) {
      <div class="user-item">
        <span>{{ user.name }}</span>
        <span>{{ user.email }}</span>
      </div>
      }

      <!-- Using class bindings instead of ngClass -->
      <div [class.active]="isActive()" [class.disabled]="isDisabled()">
        Dynamic classes
      </div>

      <!-- Using style bindings instead of ngStyle -->
      <div
        [style.background-color]="backgroundColor()"
        [style.color]="textColor()"
      >
        Dynamic styles
      </div>

      <!-- Reactive form with signals -->
      <form (ngSubmit)="onSubmit()">
        <input
          type="text"
          [ngModel]="nameControl()"
          (ngModelChange)="nameControl.set($event)"
          [class.error]="nameError()"
          placeholder="Name"
        />
        @if (nameError()) {
        <span class="error-message">{{ nameError() }}</span>
        }

        <input
          type="email"
          [ngModel]="emailControl()"
          (ngModelChange)="emailControl.set($event)"
          [class.error]="emailError()"
          placeholder="Email"
        />
        @if (emailError()) {
        <span class="error-message">{{ emailError() }}</span>
        }

        <button
          type="submit"
          [disabled]="!isFormValid()"
          [class.loading]="isSubmitting()"
        >
          {{ isSubmitting() ? 'Submitting...' : 'Submit' }}
        </button>
      </form>

      <!-- Using signal-based data instead of observable -->
      @if (userData()) {
      <div class="user-data">
        <h3>{{ userData()!.name }}</h3>
        <p>{{ userData()!.email }}</p>
      </div>
      }

      <!-- Switch statement with native control flow -->
      @switch (status()) { @case ('loading') {
      <div class="loading">Loading...</div>
      } @case ('success') {
      <div class="success">Success!</div>
      } @case ('error') {
      <div class="error">Error occurred</div>
      } @default {
      <div class="default">Default state</div>
      } }
    </div>
  `,
  styles: [
    `
      .example-container {
        padding: 1rem;
      }

      .user-item {
        display: flex;
        gap: 1rem;
        margin-bottom: 0.5rem;
      }

      .active {
        background-color: #e3f2fd;
      }

      .disabled {
        opacity: 0.5;
        pointer-events: none;
      }

      .error {
        border-color: #f44336;
      }

      .error-message {
        color: #f44336;
        font-size: 0.875rem;
      }

      .loading {
        opacity: 0.7;
      }

      .success {
        color: #4caf50;
      }

      .error {
        color: #f44336;
      }
    `,
  ],
})
export class ExampleComponent {
  // Input properties using input() function
  title = input<string>('Default Title');
  users = input<User[]>([]);
  isVisible = input<boolean>(true);

  // Output properties using output() function
  formSubmitted = output<FormData>();
  userSelected = output<User>();

  // Local state using signals
  isActive = signal(false);
  isDisabled = signal(false);
  isSubmitting = signal(false);
  status = signal<'loading' | 'success' | 'error' | 'idle'>('idle');

  // Form controls using signals
  nameControl = signal('');
  emailControl = signal('');

  // User data using signal instead of observable
  userData = signal<User | null>(null);

  // Computed signals for derived state
  backgroundColor = computed(() => (this.isActive() ? '#e3f2fd' : '#ffffff'));
  textColor = computed(() => (this.isActive() ? '#1976d2' : '#000000'));

  // Form validation using computed signals
  nameError = computed(() => {
    const name = this.nameControl();
    if (!name) return 'Name is required';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
  });

  emailError = computed(() => {
    const email = this.emailControl();
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return 'Please enter a valid email';
    return '';
  });

  isFormValid = computed(
    () => !this.nameError() && !this.emailError() && !this.isSubmitting()
  );

  constructor() {
    // Simulate loading user data
    setTimeout(() => {
      this.userData.set({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      });
    }, 1000);
  }

  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.isSubmitting.set(true);
    this.status.set('loading');

    // Simulate API call
    setTimeout(() => {
      const formData: FormData = {
        name: this.nameControl(),
        email: this.emailControl(),
      };

      this.formSubmitted.emit(formData);
      this.isSubmitting.set(false);
      this.status.set('success');

      // Reset form
      this.nameControl.set('');
      this.emailControl.set('');
    }, 1000);
  }

  selectUser(user: User): void {
    this.userSelected.emit(user);
  }

  toggleActive(): void {
    this.isActive.update((active) => !active);
  }

  toggleDisabled(): void {
    this.isDisabled.update((disabled) => !disabled);
  }
}
