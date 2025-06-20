import { Injectable, signal, Signal } from '@angular/core';

export interface NotificationProps {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Use a signal to hold the notification state.
  private notificationSignal = signal<NotificationProps | null>(null);

  // Expose the signal as a readonly version to prevent outside modification.
  public readonly notification: Signal<NotificationProps | null> =
    this.notificationSignal.asReadonly();

  showSuccess(message: string) {
    this.notificationSignal.set({ message, type: 'success' });
    this.clearAfterDelay();
  }

  showError(message: string) {
    // A simple way to make Firebase errors more readable
    const friendlyMessage = message
      .replace('Firebase: ', '')
      .split(' (auth/')[0];
    this.notificationSignal.set({ message: friendlyMessage, type: 'error' });
    this.clearAfterDelay();
  }

  clear() {
    this.notificationSignal.set(null);
  }

  private clearAfterDelay(delay: number = 5000) {
    setTimeout(() => {
      this.clear();
    }, delay);
  }
}
