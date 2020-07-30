import { Component } from '@angular/core';
import { Note } from '../note';
import { Input } from '@angular/core';
import { RouterService } from '../services/router.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  @Input()
  note: Note;
  showPalette: boolean;
  color: String;

  constructor(private routerService: RouterService,
  private noteService: NotesService) {
    this.note = new Note();
    this.showPalette = false;
  }

  edit() {
    console.log('note', this.note);
    this.routerService.routeToEditNoteView(this.note.noteId);
  }

  delete() {
    console.log('note', this.note);
    this.noteService.deleteNote(this.note.noteId);
  }

  show() {
    this.showPalette = !this.showPalette;
  }


  change(color: string) {

    this.note.color = color;
    this.noteService.editNote(this.note).subscribe(res => {
      console.log(res);
    });

  }


}
