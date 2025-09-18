import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedVouchers } from './used-vouchers';

describe('UsedVouchers', () => {
  let component: UsedVouchers;
  let fixture: ComponentFixture<UsedVouchers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsedVouchers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsedVouchers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
