import { Injectable } from '@angular/core';
import { User } from '../user';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class CreateuserService {
  user: User;
  headers: HttpHeaders
  constructor(private httpClient: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json')
  }

  createUser(user: User): Observable<User> {

    return this.httpClient.post<User>('http://localhost:8089/api/v1/auth/register', user, {
      headers: this.headers
    });
  }




}
