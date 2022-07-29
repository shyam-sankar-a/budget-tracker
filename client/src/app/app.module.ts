import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponentComponent } from './shared/card-component/card-component.component';
import { IncomeDetailsComponent } from './income-details/income-details.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { BugetTrackerMainComponent } from './buget-tracker-main/buget-tracker-main.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DoughnutChartComponent } from './shared/doughnut-chart/doughnut-chart.component';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { FiveMonthsIncomeComponent } from './five-months-income/five-months-income.component';
import { MoneySpendTrackerComponent } from './money-spend-tracker/money-spend-tracker.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { CategoryComponent } from './category/category.component';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponentComponent,
    IncomeDetailsComponent,
    ExpenseDetailsComponent,
    BugetTrackerMainComponent,
    HeaderComponent,
    FooterComponent,
    DoughnutChartComponent,
    LineChartComponent,
    FiveMonthsIncomeComponent,
    MoneySpendTrackerComponent,
    BarChartComponent,
    CategoryComponent,
    DialogBoxComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
