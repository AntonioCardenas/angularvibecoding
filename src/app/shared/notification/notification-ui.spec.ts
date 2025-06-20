import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUI } from './notification-ui';

describe('NotificationUI', () => {
  let component: NotificationUI;
  let fixture: ComponentFixture<NotificationUI>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationUI],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationUI);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
