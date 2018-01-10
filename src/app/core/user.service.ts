// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../model/user.model';
import { DataService } from './data.service';

@Injectable()
export class UserService  {
  users: BehaviorSubject<User[]>;
  userMap: Map<string, User>;
  
  constructor(private dataService: DataService) {
    this.userMap = new Map();
    this.users = new BehaviorSubject<User[]>([]);
  }
  addNewUser(user: User): Observable<any> {
    return new Observable((observer) => { 
      this.dataService.addUser(user).subscribe(() => {
        this.getUsers().subscribe(() => {});
        observer.next();
      });
    });
  }
  updateUser(user: User): Observable<any> {
    return new Observable((observer) => { 
      this.dataService.updateUser(user).subscribe(() => {
        this.getUsers().subscribe(() => {});
        observer.next();
      });
    });
  }
  getUsers(): Observable<any> {
    return new Observable((observer) => { 
      this.dataService.getUsers().subscribe((users: User[]) => {
        this.updateList(users);
        observer.next();
      });
    });
  }
  updateList(rows: User[]) {
    for (let i = 0; i < rows.length; ++i) {
      this.setUser(rows[i].id, rows[i]);
    }
    this.users.next(rows);
  }
  setUser(id: string, user: User) {
    this.userMap.set(id, user);
  }
  getUserById(id: string) {
    return this.userMap.get(id);
  }
}