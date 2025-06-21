import {
  Component,
  Signal,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationProps,
  NotificationService,
} from '../services/notification';

@Component({
  selector: 'app-notification',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './notification-ui.html',
  styleUrls: ['./notification-ui.scss'],
})
export class NotificationUI {
  private notificationService = inject(NotificationService);

  // Directly get the signal from the service.
  notification: Signal<NotificationProps | null> =
    this.notificationService.notification;

  close(): void {
    this.notificationService.clear();
  }
}
