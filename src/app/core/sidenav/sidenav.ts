import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
})
export class Sidenav {
  // It can be dynamic based on user roles
  navItems = [
    { label: 'My Data', link: '/data', icon: 'database' },
    { label: 'Profile', link: '/profile', icon: 'user' },
  ];
}
