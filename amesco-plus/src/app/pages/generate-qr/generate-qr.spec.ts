import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateQr } from './generate-qr';

describe('GenerateQr', () => {
  let component: GenerateQr;
  let fixture: ComponentFixture<GenerateQr>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateQr]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateQr);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
