import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Legend } from '../legend/legend';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const legends = [
      { id: 11, name: 'Bloodhound' },
      { id: 12, name: 'Gibraltar' },
      { id: 13, name: 'Wraith' },
      { id: 14, name: 'Pathfinder' },
      { id: 15, name: 'Mirage' },
      { id: 16, name: 'Caustic' },
      { id: 17, name: 'Lifeline' },
      { id: 18, name: 'Octane' },
      { id: 19, name: 'Wattson' },
      { id: 20, name: 'Crypto' },
    ];
    return { legends };
  }

  // Overrides the genId method to ensure that a legend always has an id.
  // If the legends array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(legends: Legend[]): number {
    return legends.length > 0
      ? Math.max(...legends.map((legend) => legend.id)) + 1
      : 11;
  }
}
