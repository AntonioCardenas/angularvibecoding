import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface getNotificationState {
  message: string;
  type: 'success' | 'error';
}
@Injectable({
  providedIn: 'root',
})
export class Notification {
  private notification$ = new BehaviorSubject<getNotificationState | null>(
    null
  );

  getNotificationState(): Observable<getNotificationState | null> {
    return this.notification$.asObservable();
  }

  showSuccess(message: string) {
    this.notification$.next({ message, type: 'success' });
    this.clearAfterDelay();
  }

  showError(message: string) {
    // A simple way to make Firebase errors more readable
    const friendlyMessage = message
      .replace('Firebase: ', '')
      .split(' (auth/')[0];
    this.notification$.next({ message: friendlyMessage, type: 'error' });
    this.clearAfterDelay();
  }

  clear() {
    this.notification$.next(null);
  }

  private clearAfterDelay(delay: number = 5000) {
    setTimeout(() => {
      this.clear();
    }, delay);
  }
}
