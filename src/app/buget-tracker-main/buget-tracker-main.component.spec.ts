import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BugetTrackerMainComponent } from './buget-tracker-main.component';

describe('BugetTrackerMainComponent', () => {
  let component: BugetTrackerMainComponent;
  let fixture: ComponentFixture<BugetTrackerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BugetTrackerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BugetTrackerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
