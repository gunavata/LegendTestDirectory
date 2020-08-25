import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendSearchComponent } from './legend-search.component';

describe('LegendSearchComponent', () => {
  let component: LegendSearchComponent;
  let fixture: ComponentFixture<LegendSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegendSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
