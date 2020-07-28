import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

  notStartedNotes: Array<Note>;
  startedNotes: Array<Note>;
  completedNotes: Array<Note>;
  errMessage: string;
  @Input()
  note: Note;

  constructor(private notesService: NotesService) {
    this.note = new Note();

  }

  ngOnInit() {
    this.notesService.getNotes().subscribe(res => {
      const tempCompleted = [];
      const tempStarted = [];
      const tempNot = [];
      res.map(function (val) {
        if (val.noteStatus === 'started') {
          tempStarted.push(val);
        } else if (val.noteStatus === 'not-started') {
          tempNot.push(val);
        } else {
          tempCompleted.push(val);
        }
      });
      this.notStartedNotes = tempNot;
      this.startedNotes = tempStarted;
      this.completedNotes = tempCompleted;

    },
      err => {
        console.log('err', err);
        this.errMessage = err;
      });
  }

}
