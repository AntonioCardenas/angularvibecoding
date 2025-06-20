import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Auth, User } from '../../auth/services/auth';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = this.auth.getUserState();
  }

  logout() {
    this.auth.logout();
  }
}
