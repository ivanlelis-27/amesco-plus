import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedPoints } from './earned-points';

describe('EarnedPoints', () => {
  let component: EarnedPoints;
  let fixture: ComponentFixture<EarnedPoints>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EarnedPoints]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EarnedPoints);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
