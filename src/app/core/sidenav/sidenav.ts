import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
} from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  link: string;
  icon: string;
  visited?: boolean;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  host: {
    '[class.collapsed]': 'isCollapsed()',
  },
})
export class Sidenav {
  private router = inject(Router);

  // Navigation items with proper routing
  navItems = signal<NavItem[]>([
    { label: 'Home', link: '/home', icon: '🏠', visited: false },
    { label: 'My Data', link: '/data', icon: '📊', visited: false },
    { label: 'Profile', link: '/profile', icon: '👤', visited: false },
    { label: 'Settings', link: '/settings', icon: '⚙️', visited: false },
  ]);

  isCollapsed = signal(false);

  toggleSidenav() {
    this.isCollapsed.update((current) => !current);
  }

  onNavClick(item: NavItem) {
    // Mark item as visited when clicked
    this.navItems.update((items) =>
      items.map((navItem) =>
        navItem.link === item.link ? { ...navItem, visited: true } : navItem
      )
    );
  }

  isActive(link: string): boolean {
    return this.router.url === link;
  }
}
