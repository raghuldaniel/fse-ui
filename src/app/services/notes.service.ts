import { Injectable } from '@angular/core';
import { Note } from '../note';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class NotesService {

  notes: Array<Note>;
  notesSubject: BehaviorSubject<Array<Note>>;
  headers: HttpHeaders;

  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) {
    this.notes = new Array<Note>();
    this.notesSubject = new BehaviorSubject([]);



  }

  fetchNotesFromServer() {
    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    //this.headers.set('Authorization', `Bearer ${token}`);
    
    this.httpClient.get<Note[]>(`http://localhost:9092/api/v1/note/${userId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {
      console.log('fetch' + resp);
      if(resp != null){
        this.notes = resp;
        this.notesSubject.next(this.notes);
      }  
    }); 
  }

  getNotes(): BehaviorSubject<Array<Note>> {
    return this.notesSubject;
  }

  addNote(note: Note): Observable<Note> {
    const token = this.authService.getBearerToken();

    note.noteCreatedBy = this.authService.getUserId();
    note.noteId = new Date().getMilliseconds();
    note.noteStatus = "not-started";
    console.log(note);
    return this.httpClient.post<Note>('http://localhost:9092/api/v1/note', note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {
        console.log(this.notes);
        console.log(this.notesSubject);
        this.notes.push(note);
        console.log(note);
        this.notesSubject.next(this.notes);
      })
      );
  }

  editNote(note: Note): Observable<Note> {
    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    return this.httpClient.put<Note>(`http://localhost:9092/api/v1/note/${userId}/${note.noteId}`, note, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).pipe(
      tap(res => {

        const enote = this.notes.find(n => n.noteId === res.noteId);
        Object.assign(enote, res);
        this.notesSubject.next(this.notes);
      })
      );
  }

  getNoteById(noteId): Note {
    console.log('noteId' + noteId);
    return this.notes.find(note => note.noteId === parseInt(noteId, 10));
  }

  deleteNote(id: Number): boolean {

    const token = this.authService.getBearerToken();
    const userId = this.authService.getUserId();
    //this.headers.set('Authorization', `Bearer ${token}`);
    this.httpClient.delete(`http://localhost:9092/api/v1/note/${userId}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    }).subscribe(resp => {


      this.notes = this.notes.filter(function (ca, i) {

        return ca.noteId != id;

      });

      this.notesSubject.next(this.notes);
    }, err => {
      console.log("Error", err);
    });

    return true;
  }
}
