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
    console.log('eZmHVrFPa7 :: ', this.queueNumbers);
  }

  handleButtonClick(buttonValue: number) {
    this.selectedButton = buttonValue;
  }

  isButtonSelected(buttonValue: number): boolean {
    console.log('09swx2k2xH :: this.selectedButton : ', this.selectedButton)
    return this.selectedButton === buttonValue;
  }

  callByNumber() {
    console.log('thZ7539zYn :: callByNumber() : ', this.selectedButton)
    this.calledByNumber.emit(this.selectedButton);
  }

}
