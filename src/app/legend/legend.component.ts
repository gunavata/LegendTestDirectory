import { Component, OnInit } from '@angular/core';

import { LegendService } from '../service/legend.service';
import { Legend } from './legend';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.css'],
})
export class LegendComponent implements OnInit {
  legends: Legend[];


  // Previously used to show how to get and display on a page

  // selectedLegend: Legend;

  // legend: Legend = {
  //   id: 1,
  //   name: 'Bangalore',
  // };

  constructor(
    private legendService: LegendService
  ) {}

  ngOnInit(): void {
    this.getLegends();
  }

  // Prior to using routing, the details were displayed directly on page
  //
  // onSelect(legend: Legend): void {
  //   this.selectedLegend = legend;
  //   this.messageService.add(`LegendComponent: Selected legend id=${legend.id}`);
  // }

  // This is a synchronous method of getting legends and wont work
  // in a real app. It needs to be asynchronous (Observables?)
  //
  // getLegends(): void {
  //   this.legends = this.legendService.getLegends();
  // }

  // Asynchronous method returning an Observable object provided by RxJS.
  getLegends(): void {
    this.legendService
      .getLegends()
      .subscribe((legends) => (this.legends = legends));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.legendService.addLegend({ name } as Legend)
      .subscribe(legend => {
        this.legends.push(legend);
      });
  }

  delete(legend: Legend): void {
    this.legends = this.legends.filter(h => h !== legend);
    this.legendService.deleteLegend(legend).subscribe();
  }
}
