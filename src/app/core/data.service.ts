// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

// import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService  {
  rootApiUrl: string; 
  
  constructor(
    private http: HttpClient,
  ) {
    this.rootApiUrl = environment.rootApiUrl;
  }

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(`${this.rootApiUrl}/users`)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  // /** GET user by id. Return `undefined` when id not found */
  // getUserNo404<Data>(id: number): Observable<User> {
  //   const url = `${this.rootApiUrl}/users/?id=${id}`;
  //   return this.http.get<User[]>(url)
  //     .pipe(
  //       map(users => users[0]), // returns a {0|1} element array
  //       tap(h => {
  //         const outcome = h ? `fetched` : `did not find`;
  //         this.log(`${outcome} user id=${id}`);
  //       }),
  //       catchError(this.handleError<User>(`getUser id=${id}`))
  //     );
  // }
  
  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(`${this.rootApiUrl}/users`, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.rootApiUrl}/users/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(`${this.rootApiUrl}/users`, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
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
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a DataService message with the MessageService */
  private log(message: string) {
    // this.messageService.add('DataService: ' + message);
    console.log('DataService: ' + message);
  }
}