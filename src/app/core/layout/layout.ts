import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidenav } from '../sidenav/sidenav';
import { CommonModule } from '@angular/common';
import { NotificationUI } from '../../shared/notification/notification-ui';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Footer,
    Sidenav,
    NotificationUI,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
