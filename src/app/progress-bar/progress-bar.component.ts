import {Component, Input} from '@angular/core';

@Component({
  selector: 'mediQR-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() queueNumber: number;
  @Input() numberOfPeople: number;

  getProgressTransform(): string {
    const progress = this.numberOfPeople > 0 ? (this.numberOfPeople - 1) / this.numberOfPeople * 100 : 0;
    return `translate(-50%, -50%) rotate(${progress}deg)`;
  }

  getWaitingMinutes(): number {
    return this.numberOfPeople * 5;
  }
}
