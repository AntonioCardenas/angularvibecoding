import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
})
export class Spinner {}
