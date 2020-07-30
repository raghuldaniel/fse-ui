import { Injectable } from '@angular/core';
import { Reminder } from '../reminder';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators/tap';

@Injectable()
export class ReminderService {

  reminders: Array<Reminder>;
  remindersSubject: BehaviorSubject<Array<Reminder>>;

  constructor(private authService: AuthenticationService,
    private httpClient: HttpClient) {

    this.reminders = [];
    this.remindersSubject = new BehaviorSubject([]);
    this.fetchReminder();
  }

  fetchReminder() {

    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    // this.headers.set('Authorization', `Bearer ${token}`);
    this.httpClient.get<Reminder[]>(`http://localhost:8081/api/v1/reminder/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {
      console.log('fetch' + resp);
      this.reminders = resp;
      this.remindersSubject.next(this.reminders);
    });


  }

  getReminders(): BehaviorSubject<Array<Reminder>> {
    return this.remindersSubject;
  }

  addReminder(rem: Reminder): Observable<Reminder> {
    const token = this.authService.getBearerToken();

    rem.reminderCreatedBy = this.authService.getUserId();
    rem.reminderCreationDate = new Date();
    rem.reminderId = new Date().getMilliseconds().toString();
    console.log(rem);

    return this.httpClient.post<Reminder>('http://localhost:8081/api/v1/reminder', rem, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        console.log('respomse' + res);
        this.reminders.push(res);
        this.remindersSubject.next(this.reminders);
      })
      );
  }


  updateReminder(rem: Reminder): Observable<Reminder> {
    const token = this.authService.getBearerToken();



    return this.httpClient.put<Reminder>(`http://localhost:8081/api/v1/reminder/${rem.reminderId}`, rem, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        console.log('respomse' + res);
        const enote = this.reminders.find(n => n.reminderId === res.reminderId);
        Object.assign(enote, res);
        this.remindersSubject.next(this.reminders);

      })
      );
  }

  deleteReminders(remId: String): boolean {

    const token = this.authService.getBearerToken();
    this.httpClient.delete(`http://localhost:8081/api/v1/reminder/${remId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {
      this.reminders = this.reminders.filter(function (ca, i) {

        return ca.reminderId !== remId;

      });

      this.remindersSubject.next(this.reminders);
    }, err => {
      console.log('Error', err);
    });

    return true;
  }


}
