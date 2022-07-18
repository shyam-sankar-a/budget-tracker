import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {
  canvas: any;
  ctx: any;
  @ViewChild('myChart') myChart:any;
  @Input('chartType') chartType = 'income';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvas = this.myChart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          datasets: [{
              label: 'Current Vallue',
              data: [0, 20, 40, 50],
              backgroundColor: "rgb(115 185 243 / 65%)",
              borderColor: "#007ee7",
              fill: true,
          },
          {
            label: 'Invested Amount',
            data: [0, 20, 40, 60, 80],
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
        }],
          labels: ['January 2019', 'February 2019', 'March 2019', 'April 2019']
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom'
        }
      }
    });
  }

}
