import { Component, OnInit, Input } from '@angular/core';
import { CARD_TITLES } from '../../utils/constants';

@Component({
  selector: 'app-card-component',
  templateUrl: './card-component.component.html',
  styleUrls: ['./card-component.component.scss']
})
export class CardComponentComponent implements OnInit {

  @Input() type:string = "INCOME_TOTAL";
  title:string = "Demo Title";
  subTitle:string = "Demo Sub title";

  constructor() { }

  ngOnInit(): void {
    const titleData = CARD_TITLES[this.type];
    this.title = titleData.TITLE;
    this.subTitle = titleData.SUB_TITLE
  }

}
