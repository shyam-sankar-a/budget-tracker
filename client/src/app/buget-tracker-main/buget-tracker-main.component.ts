import { Component, OnInit } from '@angular/core';
export interface Brand {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-buget-tracker-main',
  templateUrl: './buget-tracker-main.component.html',
  styleUrls: ['./buget-tracker-main.component.scss']
})
export class BugetTrackerMainComponent implements OnInit {
  brands: Brand[] = [
    { value: 'Louis Vuitton', viewValue: 'Louis Vuitton' },
    { value: 'Gucci', viewValue: 'Gucci' },
    { value: 'Prada', viewValue: 'Prada' },
    { value: 'Chanel', viewValue: 'Chanel' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
