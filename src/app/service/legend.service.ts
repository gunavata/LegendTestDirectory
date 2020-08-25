import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Legend } from '../legend/legend';
import { LegendList } from '../legend/legend-list';
import { MessageService } from '../service/message.service';

@Injectable({
  providedIn: 'root',
})
export class LegendService {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private legendsUrl = 'api/legends';

  private log(message: string) {
    this.messageService.add(`LegendService: ${message}`);
  }

  // Using RxJS simulated of() to pretend it is a response
  // getLegends(): Observable<Legend[]> {
  //   this.log('fetched Legends');
  //   return of(LegendList);
  // }

  // Using HTTPClient to get from a url
  getLegends(): Observable<Legend[]> {
    return this.http.get<Legend[]>(this.legendsUrl).pipe(
      tap((_) => this.log('fetched Legends')),
      catchError(this.handleError<Legend[]>('getLegends', []))
    );
  }

  /** GET legend by id. Will 404 if id not found */
  getLegend(id: number): Observable<Legend> {
    const url = `${this.legendsUrl}/${id}`;
    return this.http.get<Legend>(url).pipe(
      tap((_) => this.log(`fetched legend id=${id}`)),
      catchError(this.handleError<Legend>(`getLegend id=${id}`))
    );
  }

  /** PUT: update the legend on the server */
  updateLegend(legend: Legend): Observable<any> {
    return this.http.put(this.legendsUrl, legend, this.httpOptions).pipe(
      tap((_) => this.log(`updated legend id=${legend.id}`)),
      catchError(this.handleError<any>('updateLegend'))
    );
  }

  /** POST: add a new legend to the server */
  addLegend(legend: Legend): Observable<Legend> {
    return this.http
      .post<Legend>(this.legendsUrl, legend, this.httpOptions)
      .pipe(
        tap((newlegend: Legend) =>
          this.log(`added legend w/ id=${newlegend.id}`)
        ),
        catchError(this.handleError<Legend>('addlegend'))
      );
  }

  /** DELETE: delete the legend from the server */
  deleteLegend(legend: Legend | number): Observable<Legend> {
    const id = typeof legend === 'number' ? legend : legend.id;
    const url = `${this.legendsUrl}/${id}`;

    return this.http.delete<Legend>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted legend id=${id}`)),
      catchError(this.handleError<Legend>('deleteLegend'))
    );
  }

  /* GET legends whose name contains search term */
  searchlegends(term: string): Observable<Legend[]> {
    if (!term.trim()) {
      // if not search term, return empty legend array.
      return of([]);
    }
    return this.http.get<Legend[]>(`${this.legendsUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found legends matching "${term}"`)
          : this.log(`no legends matching "${term}"`)
      ),
      catchError(this.handleError<Legend[]>('searchLegends', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
