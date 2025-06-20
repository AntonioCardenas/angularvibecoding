import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationProps,
  NotificationService,
} from '../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-ui.html',
  styleUrls: ['./notification-ui.scss'],
})
export class NotificationUI {
  // Directly get the signal from the service.
  notification: Signal<NotificationProps | null>;

  constructor(private notificationService: NotificationService) {
    // Assign the readonly signal from the service to the component's property.
    this.notification = this.notificationService.notification;
  }

  close() {
    this.notificationService.clear();
  }
}
