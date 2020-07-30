import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Reminder } from '../reminder';
import { ReminderService } from '../services/reminder.service';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent implements OnInit {

  reminders: Array<Reminder>;
  reminder: Reminder;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  public submitMessage: string;

  public successMessage: string;

  mode: boolean;

  constructor(private reminderService: ReminderService) {
    this.reminderService.fetchReminder();
    this.reminder = new Reminder();
    this.mode = true;
  }


  ngOnInit() {
    this.reminderService.getReminders().subscribe(res => {
      console.log('catres' + res);
      this.reminders = res;
    });
  }

  // readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  add(form): void {
    if (this.mode) {
      this.reminderService.addReminder(this.reminder).subscribe(res => {
        this.successMessage = 'User saved successfully!!!';
        console.log(res);
      }, err => {
        console.log(err);
      });

      this.mode = true;
    } else {

      this.reminderService.updateReminder(this.reminder).subscribe(res => {
        this.successMessage = 'User saved successfully!!!';
        console.log(res);
      }, err => {
        console.log(err);
      });
      this.reminder = new Reminder();
      this.removable = true;


    }

    this.submitMessage = '';
    form.resetForm();


  }



  remove(rem: Reminder): void {




    this.reminderService.deleteReminders(rem.reminderId);
    this.mode = true;


  }

  edit(rem: Reminder): void {



    this.removable = false;
    this.mode = false;

    this.reminder = rem;


    this.reminder.reminderCreationDate = new Date(this.reminder.reminderCreationDate);




  }

}
