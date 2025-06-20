import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { Sidenav } from './core/sidenav/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Sidenav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'angularvibecoding';
}
