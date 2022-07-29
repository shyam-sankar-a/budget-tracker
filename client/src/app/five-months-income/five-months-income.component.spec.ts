import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiveMonthsIncomeComponent } from './five-months-income.component';

describe('FiveMonthsIncomeComponent', () => {
  let component: FiveMonthsIncomeComponent;
  let fixture: ComponentFixture<FiveMonthsIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiveMonthsIncomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiveMonthsIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
