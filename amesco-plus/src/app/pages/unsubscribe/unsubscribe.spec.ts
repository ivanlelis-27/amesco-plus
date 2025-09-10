import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unsubscribe } from './unsubscribe';

describe('Unsubscribe', () => {
  let component: Unsubscribe;
  let fixture: ComponentFixture<Unsubscribe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unsubscribe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unsubscribe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
