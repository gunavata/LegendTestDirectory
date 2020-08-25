import { Component, OnInit } from '@angular/core';
import { Legend } from '../legend/legend';
import { LegendService } from '../service/legend.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  legends: Legend[] = [];

  constructor(private legendService: LegendService) { }

  ngOnInit() {
    this.getLegends();
  }

  getLegends(): void {
    this.legendService.getLegends()
      .subscribe(legends => this.legends = legends.slice(1, 5));
  }
}
