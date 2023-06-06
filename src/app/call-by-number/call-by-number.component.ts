import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mediQR-call-by-number',
  templateUrl: './call-by-number.component.html',
  styleUrls: ['./call-by-number.component.scss']
})
export class CallByNumberComponent implements OnInit {

  @Input() queueNumbers: Map<number, number>;
  @Output() calledByNumber = new EventEmitter<number>;

  selectedButton: number = 0;

  constructor() {
  }

  ngOnInit(): void {
  }

  handleButtonClick(buttonValue: number) {
    this.selectedButton = buttonValue;
  }

  isButtonSelected(buttonValue: number): boolean {
    return this.selectedButton === buttonValue;
  }

  callByNumber() {
    this.calledByNumber.emit(this.selectedButton);
  }

}
