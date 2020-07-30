import { Component } from '@angular/core';
import { RouterService } from '../services/router.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;


  constructor(private routerService: RouterService,
    private location: Location) {

  }

  navigate() {
    if (!this.isNoteView) {
      this.routerService.routeToNoteView();
    } else {
      this.routerService.routeToListView();
    }
    this.isNoteView = !this.isNoteView;
  }


}
