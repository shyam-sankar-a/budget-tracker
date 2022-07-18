import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cols: any;
  gridByBreakpoint: any = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 2,
    xs: 1
  };

  budgetWidgetRowSpan: number = 2;
  budgetWidgetColSpan: number = 1;
  incomeWidgetRowSpan: number = 2;
  incomeWidgetColSPan: number = 1;
  expenseWidgetRowSpan: number = 2;
  expenseWidgetColSpan: number = 1;
  incomeDetailsRowSpan: number = 2;
  incomeDetailsColSpan: number = 2;
  categoryWidgetRowSpan: number = 2;
  categoryWidgetColSpan: number = 1;
  moneySpendWidgetRowSpan: number = 2;
  moneySpendWidgetColSpan: number = 3;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.initializeColsCount()
  }

  ngAfterContentInit() {
    this.initializeColsCount()
  }

  onResize(event:any) {
    this.initializeColsCount();
  }

  initializeColsCount() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
          this.budgetWidgetRowSpan = 2;
          this.budgetWidgetColSpan = 1;
          this.incomeWidgetRowSpan = 2;
          this.incomeWidgetColSPan = 1;
          this.expenseWidgetRowSpan = 2;
          this.expenseWidgetColSpan = 1;
          this.incomeDetailsRowSpan = 2;
          this.incomeDetailsColSpan = 1;
          this.categoryWidgetRowSpan = 2;
          this.categoryWidgetColSpan = 1;
          this.moneySpendWidgetRowSpan = 2;
          this.moneySpendWidgetColSpan = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
          this.budgetWidgetRowSpan = 2;
          this.budgetWidgetColSpan = 1;
          this.incomeWidgetRowSpan = 2;
          this.incomeWidgetColSPan = 1;
          this.expenseWidgetRowSpan = 2;
          this.expenseWidgetColSpan = 1;
          this.incomeDetailsRowSpan = 2;
          this.incomeDetailsColSpan = 1;
          this.categoryWidgetRowSpan = 2;
          this.categoryWidgetColSpan = 1;
          this.moneySpendWidgetRowSpan = 2;
          this.moneySpendWidgetColSpan = 1;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
          this.budgetWidgetRowSpan = 2;
          this.budgetWidgetColSpan = 1;
          this.incomeWidgetRowSpan = 2;
          this.incomeWidgetColSPan = 1;
          this.expenseWidgetRowSpan = 2;
          this.expenseWidgetColSpan = 1;
          this.incomeDetailsRowSpan = 2;
          this.incomeDetailsColSpan = 2;
          this.categoryWidgetRowSpan = 2;
          this.categoryWidgetColSpan = 1;
          this.moneySpendWidgetRowSpan = 2;
          this.moneySpendWidgetColSpan = 3;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
          this.budgetWidgetRowSpan = 2;
          this.budgetWidgetColSpan = 1;
          this.incomeWidgetRowSpan = 2;
          this.incomeWidgetColSPan = 1;
          this.expenseWidgetRowSpan = 2;
          this.expenseWidgetColSpan = 1;
          this.incomeDetailsRowSpan = 2;
          this.incomeDetailsColSpan = 2;
          this.categoryWidgetRowSpan = 2;
          this.categoryWidgetColSpan = 1;
          this.moneySpendWidgetRowSpan = 2;
          this.moneySpendWidgetColSpan = 3;
        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
          this.budgetWidgetRowSpan = 2;
          this.budgetWidgetColSpan = 1;
          this.incomeWidgetRowSpan = 2;
          this.incomeWidgetColSPan = 1;
          this.expenseWidgetRowSpan = 2;
          this.expenseWidgetColSpan = 1;
          this.incomeDetailsRowSpan = 2;
          this.incomeDetailsColSpan = 2;
          this.categoryWidgetRowSpan = 2;
          this.categoryWidgetColSpan = 1;
          this.moneySpendWidgetRowSpan = 2;
          this.moneySpendWidgetColSpan = 3;
        }
      }
    });
  }
}
