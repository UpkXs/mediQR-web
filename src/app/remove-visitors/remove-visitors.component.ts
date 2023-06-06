import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mediQR-remove-visitors',
  templateUrl: './remove-visitors.component.html',
  styleUrls: ['./remove-visitors.component.scss']
})
export class RemoveVisitorsComponent implements OnInit {

  @Input() queueNumbers: Map<number, number>;
  @Output() calledByNumbers = new EventEmitter<number[]>;

  constructor() { }

  ngOnInit(): void {
  }

  selectedButtons: number[] = [];

  handleButtonClick(buttonValue: number) {
    const index = this.selectedButtons.indexOf(buttonValue);
    if (index === -1) {
      // Button was not selected, add it to the array
      this.selectedButtons.push(buttonValue);
    } else {
      // Button was already selected, remove it from the array
      this.selectedButtons.splice(index, 1);
    }
  }

  isSelectedButton(buttonValue: number): boolean {
    return this.selectedButtons.includes(buttonValue);
  }

  removeByQueueNumbers() {
    this.calledByNumbers.emit(this.selectedButtons);
  }
}
