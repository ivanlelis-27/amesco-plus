import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoucher } from './create-voucher';

describe('CreateVoucher', () => {
  let component: CreateVoucher;
  let fixture: ComponentFixture<CreateVoucher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateVoucher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVoucher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
