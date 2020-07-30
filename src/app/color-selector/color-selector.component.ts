import { Component, OnInit, Input, Output, EventEmitter   } from '@angular/core';


@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {

  constructor() { }

  public defaultColors: string[] = [
    '#ffffff',
    '#D7AEFB',
    '#F28B82',
    '#A7FFEB',
    '#FFF475'


  ];

  @Input() heading: string;
  @Input() color: string;
  @Output() change = new EventEmitter();

  @Input() show: boolean;

  ngOnInit() {
  }

  /**
 * Change color from default colors
 * @param {string} color
 */
public changeColor(color: string) {
  console.log('changed' + color);
  this.color = color;
  this.change.emit(this.color); // Return color
  this.show = false;
}



}
