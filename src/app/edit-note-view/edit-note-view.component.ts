import { Component, OnInit, Inject } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditNoteOpenerComponent } from '../edit-note-opener/edit-note-opener.component';
import { Category } from '../category';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-note-view',
  templateUrl: './edit-note-view.component.html',
  styleUrls: ['./edit-note-view.component.css']
})
export class EditNoteViewComponent implements OnInit {
  note: Note;
  states: Array<string> = ['not-started', 'started', 'completed'];
  errMessage: string;

  categories: Category[];
  reminders: Reminder[];
  selectedReminders: Reminder[];
  selectedCategories: Category[]



  constructor(private noteService: NotesService,
    private dialogRef: MatDialogRef<EditNoteOpenerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catService: CategoryService,
    private remService: ReminderService
  ) {
    this.reminders = [];
    this.categories = [];
    this.selectedCategories = [];
    this.selectedReminders = [];

  }

  ngOnInit() {
    this.note = this.noteService.getNoteById(this.data.id);
    this.selectedCategories = this.note.category;
    this.selectedReminders = this.note.reminders;
    this.errMessage = '';
    console.log(this.selectedCategories )
    this.catService.getCategories().subscribe(res => {
      this.categories = res;
      console.log(this.categories)
      if (this.selectedCategories != null) {
        this.categories.forEach(element => {

          this.selectedCategories.forEach(ele => {
            
            if (element.categoryId == ele.categoryId) {
              element.checked = true;
              console.log("che cked elee")

            }
          });

        });
      }



    });



    this.remService.getReminders().subscribe(res => {
      this.reminders = res;
      if (this.selectedReminders != null) {
        this.reminders.forEach(element => {

          this.selectedReminders.forEach(ele => {
            if (element.reminderId == ele.reminderId) {
              element.checked = true;
              console.log("che cked rem")


            }
          });

        });
      }
    });


  }

  onSave() {
    this.errMessage = '';
    this.note.category = this.selectedCategories;
    this.note.reminders = this.selectedReminders;
    this.noteService.editNote(this.note).subscribe((editRes) => {
      this.dialogRef.close();
    },
      (error) => {
        console.log(error);
        if (error.status === 403) {
          this.errMessage = error.error.message;
        } else {
          this.errMessage = error.message;
        }
      });



  }

  addRemoveCategories(cat: Category) {

    cat.checked = !cat.checked;
    let seleRem = this.selectedCategories.filter(function(value){
      return value.categoryId != cat.categoryId;
    });

    if(seleRem.length != this.selectedCategories.length){
      this.selectedCategories = seleRem;
    }else{
      this.selectedCategories.push(cat);
    }
    

  }

  addRemoveReminders(rem: Reminder) {

     rem.checked = !rem.checked;
      let seleRem = this.selectedReminders.filter(function(value){
        return value.reminderId != rem.reminderId;
      });

      if(seleRem.length != this.selectedReminders.length){
        this.selectedReminders = seleRem;
      }else{
        this.selectedReminders.push(rem);
      }
     


  }



}
