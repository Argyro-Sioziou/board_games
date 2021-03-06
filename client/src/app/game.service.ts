import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { delay } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Game } from './game';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class GameService {

  private gamesUrl = 'api/games';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getGames(): Observable<Game[]> {
  return this.http.get<Game[]>(this.gamesUrl)
    .pipe(
      tap(_ => this.log('fetched games')),
      catchError(this.handleError('getGames', []))
    );
  }

  /** GET game by id. Will 404 if id not found */
  getGame(id: number): Observable<Game> {
    const url = `${this.gamesUrl}/${id}`;
    return this.http.get<Game>(url).pipe(
      tap(_ => this.log(`fetched game id=${id}`)),
      catchError(this.handleError<Game>(`getGame id=${id}`))
    );
  }

  /** PUT: update the game on the server */
 updateGame (game: Game): Observable<Game> {
   const url = `${this.gamesUrl}/${game.id}`;
   return this.http.put(url, game, httpOptions).pipe(
     tap(_ => this.log(`updated game id=${game.id}`)),
     catchError(this.handleError<any>('updateGame'))
   );
}

  /* GET games whose title contains search term */
  searchGames(term: string): Observable<Game[]> {
    if (!term.trim()) {
      // if not search term, return empty game array.
      return of([]);
    }
    return this.http.get<Game[]>(`api/games/?name=${term}`).pipe(delay(2000));
  }

  /* GET games whose title contains search term */
  filterGames(filter: string): Observable<Game[]> {
    if (!filter.trim()) {
      return this.http.get<Game[]>(this.gamesUrl)
      .pipe(
      tap(_ => this.log('fetched games')),
        catchError(this.handleError('getGames', []))
      );
    }
    return this.http.get<Game[]>(`api/games/${filter}`).pipe(
      tap(_ => this.log(`found games matching "${filter}"`)),
      catchError(this.handleError<Game[]>('filterGames', []))
    );
  }

  private log(message: string): void {
    this.messageService.add('GameService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
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
