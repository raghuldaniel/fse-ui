import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Category } from '../category';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class CategoryService {

  categories: Array<Category>;
  categoriesSubject: BehaviorSubject<Array<Category>>;

  constructor(private authService: AuthenticationService,
    private httpClient: HttpClient) {

    this.categories = [];
    this.categoriesSubject = new BehaviorSubject([]);
    this.fetchCategory();
  }

  fetchCategory() {

    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    // this.headers.set('Authorization', `Bearer ${token}`);
    this.httpClient.get<Category[]>(`http://localhost:8083/api/v1/category/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {
      console.log('fetch' + resp);
      this.categories = resp;
      this.categoriesSubject.next(this.categories);
    });


  }

  getCategories(): BehaviorSubject<Array<Category>> {
    return this.categoriesSubject;
  }

  addCategories(cat: Category): Observable<Category> {
    const token = this.authService.getBearerToken();

    cat.categoryCreatedBy = this.authService.getUserId();
    cat.categoryCreationDate = new Date();
    cat.categoryId = new Date().getMilliseconds().toString();
    console.log(cat);

    return this.httpClient.post<Category>('http://localhost:8083/api/v1/category', cat, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        console.log('respomse' + res);
        this.categories.push(res);
        this.categoriesSubject.next(this.categories);
      })
      );
  }

  deleteCategories(catId: String): boolean {

    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    // this.headers.set('Authorization', `Bearer ${token}`);
    this.httpClient.delete(`http://localhost:8083/api/v1/category/${catId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {


      this.categories = this.categories.filter(function (ca, i) {

        return ca.categoryId !== catId;

      });

      this.categoriesSubject.next(this.categories);
    }, err => {
      console.log('Error', err);
    });

    return true;
  }


}
