import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Legend } from '../legend/legend';
import { LegendService } from '../service/legend.service';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-legend-search',
  templateUrl: './legend-search.component.html',
  styleUrls: ['./legend-search.component.css'],
})
export class LegendSearchComponent implements OnInit {
  legends$: Observable<Legend[]>;
  private searchTerms = new Subject<string>();

  constructor(private legendService: LegendService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    if (term.length > 2) {
      this.searchTerms.next(term);
    }
  }

  ngOnInit(): void {
    this.legends$ = this.searchTerms.pipe(
      // ignore less than 2 chars
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.legendService.searchlegends(term))
    );
  }
}
