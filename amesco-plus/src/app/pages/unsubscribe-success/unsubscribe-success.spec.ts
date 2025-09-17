import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeSuccess } from './unsubscribe-success';

describe('UnsubscribeSuccess', () => {
  let component: UnsubscribeSuccess;
  let fixture: ComponentFixture<UnsubscribeSuccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsubscribeSuccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnsubscribeSuccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
