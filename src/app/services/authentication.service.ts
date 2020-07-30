import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable()
export class AuthenticationService {

  constructor(private httpClient: HttpClient) {

  }

  headers: HttpHeaders;

  authenticateUser(data) {
    const user = new User();
    user.userId = data.username;
    user.userPassword = data.password;
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', user, {
      headers: this.headers,
      responseType: 'text'
    });
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setUserId(userId) {
    console.log('set' + userId);
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  isUserAuthenticated(token): Promise<boolean> {

    return new Promise((resolve, reject) => {
      // this.httpClient.post('http://localhost:3000/auth/v1/isAuthenticated', {},
      //   {
      //     headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
      //   }).subscribe(resp => {
      //     const isAuthenticated = resp['isAuthenticated'];
      //     console.log('isAuthenticated', isAuthenticated);
      //     resolve(isAuthenticated);
      //   });

      if (!token) {
        resolve(false);
      } else {
        resolve(true);
      }


    });
  }

}
