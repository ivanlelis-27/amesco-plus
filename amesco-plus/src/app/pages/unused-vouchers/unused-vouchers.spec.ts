import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnusedVouchers } from './unused-vouchers';

describe('UnusedVouchers', () => {
  let component: UnusedVouchers;
  let fixture: ComponentFixture<UnusedVouchers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnusedVouchers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnusedVouchers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
