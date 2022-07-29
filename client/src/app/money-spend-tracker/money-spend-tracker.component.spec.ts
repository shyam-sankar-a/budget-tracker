import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneySpendTrackerComponent } from './money-spend-tracker.component';

describe('MoneySpendTrackerComponent', () => {
  let component: MoneySpendTrackerComponent;
  let fixture: ComponentFixture<MoneySpendTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneySpendTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneySpendTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
