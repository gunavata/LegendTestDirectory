import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Legend } from '../legend/legend';
import { LegendService } from '../service/legend.service';

@Component({
  selector: 'app-legend-detail',
  templateUrl: './legend-detail.component.html',
  styleUrls: ['./legend-detail.component.css']
})
export class LegendDetailComponent implements OnInit {

  @Input() legend: Legend;

  constructor(
    private route: ActivatedRoute,
    private legendService: LegendService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getLegend();
  }

  getLegend(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.legendService.getLegend(id)
      .subscribe(legend => this.legend = legend);
  }

  save(): void {
    this.legendService.updateLegend(this.legend)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

}
