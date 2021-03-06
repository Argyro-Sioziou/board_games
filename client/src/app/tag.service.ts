import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Tag } from "./tag";

@Injectable({
  providedIn: 'root'
})

export class TagService {

  private tagsUrl = 'api/tags';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getTags(): Observable<Tag[]> {
  return this.http.get<Tag[]>(this.tagsUrl)
    .pipe(
      tap(_ => this.log('fetched tags')),
      catchError(this.handleError('getTags', []))
    );
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

  private log(message: string): void {
    this.messageService.add('TagService: ' + message);
  }
}
