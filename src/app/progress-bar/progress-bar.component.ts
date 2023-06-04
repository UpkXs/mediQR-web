import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'mediQR-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() queueNumber: number;
  @Input() numberOfPeople: number;

  @ViewChild('progBar', {static: true}) progBar: ElementRef;

  progressValue = 0;
  progressEndValue = 0;
  tempValue = 0;
  currentPercent = 0;
  currentMinute: string;

  ngOnInit(): void {
    this.progressEndValue = this.getWaitingTime() * 60 * 1000; // in milliseconds
    this.progressValue = 0;
    this.tempValue = this.getWaitingTime() * 0.6;
  }

  ngAfterViewInit() {
    let progressBar = this.progBar.nativeElement;

    this.currentPercent = 0;

    const timer$ = interval(100);

    const sub = timer$.subscribe((sec) => {
      this.currentMinute = ((this.progressEndValue - (sec * 100)) / 60).toFixed(0);
      this.currentMinute = this.currentMinute.length > 3 ? this.currentMinute.charAt(0) : '1';

      this.progressValue = Number.parseFloat((this.progressValue + 0.1).toFixed(1));

      if ((this.progressValue / this.tempValue).toFixed(0) === (this.currentPercent + 1).toString()) {
        this.currentPercent += 1;

        progressBar.style.background = 'conic-gradient(' +
          '#85D4FF' + ' ' + this.currentPercent * 3.6 + 'deg,' +
          '#BCE8FF' + ' ' + this.currentPercent * 3.6 + 'deg' +
          ')';
      }

      if (this.progressValue === this.progressEndValue / 1000) {
        sub.unsubscribe();
      }
    });
  };

  getWaitingTime(): number {
    return this.numberOfPeople * 5; // for each person gives 5 minutes
  }
}
