import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Membercheck } from './membercheck';

describe('Membercheck', () => {
  let component: Membercheck;
  let fixture: ComponentFixture<Membercheck>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Membercheck]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Membercheck);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
