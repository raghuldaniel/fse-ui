import { Component } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private notesService: NotesService) {
    this.notesService.fetchNotesFromServer();
  }

  ngOnInit() {

  }

}
