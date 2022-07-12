import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card'

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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardComponentComponent,
    IncomeDetailsComponent,
    ExpenseDetailsComponent,
    BugetTrackerMainComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
