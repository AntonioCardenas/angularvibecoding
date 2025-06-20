import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { Sidenav } from '../sidenav/sidenav';
import { CommonModule } from '@angular/common';
import { Notification } from '../../shared/notification/notification';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, Header, Footer, Sidenav, Notification],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
