import { Component, OnInit, ViewChild } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { CategoryService } from '../services/category.service';
import { ReminderService } from '../services/reminder.service';
import { Category } from '../category';
import { Reminder } from '../reminder';




@Component({
  selector: 'app-note-taker',
  templateUrl: './note-taker.component.html',
  styleUrls: ['./note-taker.component.css']
})
export class NoteTakerComponent implements OnInit {

  errMessage: string;
  public note: Note;

  categories: Category[];
  reminders: Reminder[];
  selectedCategories: Category[];
  selectedReminders: Reminder[];




  constructor(private notesService: NotesService,
    private catService: CategoryService,
    private remService: ReminderService) {
    this.note = new Note();
    this.reminders = [];
    this.categories = [];
    this.selectedCategories = [];
    this.selectedReminders = [];

  }

  ngOnInit() {
    this.catService.getCategories().subscribe(res => {
      this.categories = res;
    });
    this.remService.getReminders().subscribe(res => {
      this.reminders = res;
    });
  }



  addNote() {
    console.log(this.note);
    if (this.note.noteTitle === undefined || this.note.noteTitle === '' || this.note.noteContent === undefined
      || this.note.noteContent === '') {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }

    this.errMessage = '';
    this.note.noteCreationDate = new Date();
    this.selectedCategories.forEach(function(value) {
      value.checked = true;
    });
    this.selectedReminders.forEach(function(value) {
      value.checked = true;
    });
    this.note.category = this.selectedCategories;
    this.note.reminders = this.selectedReminders;
    this.notesService.addNote(this.note).subscribe(data => {
    },
      error => {
        this.errMessage = error.message;
        console.log('err', error);
      });
    this.note = new Note();
    this.selectedCategories = [];
    this.selectedReminders = [];
  }


  addRemoveCategories(cat: Category) {
    const index = this.selectedCategories.indexOf(cat);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(cat);
    }

  }

  addRemoveReminders(rem: Reminder) {
    const index = this.selectedReminders.indexOf(rem);
    if (index >= 0) {
      this.selectedReminders.splice(index, 1);
    } else {
      this.selectedReminders.push(rem);
    }

  }




}
