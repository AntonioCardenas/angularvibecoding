import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';

interface NavItem {
  label: string;
  link: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  // Navigation items with proper routing
  navItems: NavItem[] = [
    { label: 'Home', link: '/home', icon: 'home' },
    { label: 'My Data', link: '/data', icon: 'database' },
    { label: 'Profile', link: '/profile', icon: 'user' },
    { label: 'Settings', link: '/settings', icon: 'settings' },
  ];
}
