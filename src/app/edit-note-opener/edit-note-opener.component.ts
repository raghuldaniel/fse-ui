import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material/dialog';
import { EditNoteViewComponent } from '../edit-note-view/edit-note-view.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note-opener',
  templateUrl: './edit-note-opener.component.html',
  styleUrls: ['./edit-note-opener.component.css']
})
export class EditNoteOpenerComponent implements OnInit {

  constructor(private routerService: RouterService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.paramMap.get('noteId');
    const dialogRef = this.dialog.open(EditNoteViewComponent, {
      width: '50%',
      data: {
        id: id
      },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      routerService.routeBack();
    });

     }

  ngOnInit() {

  }

  navigate(noteId: Number) {
    this.routerService.routeToEditNoteView(noteId);
  }

}
