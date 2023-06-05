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
  @Input() isYourTurn: boolean;

  @ViewChild('progBar', {static: true}) progBar: ElementRef;

  progressValue = 0;
  progressEndValue = 0;
  tempValue = 0;
  currentPercent = 0;
  currentMinute: string;
  isQueueSoon: boolean = false;

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

      if (this.isYourTurn) { // todo aro OI3qM2NTxd add isLeaved true and orderIndex to Queue
        progressBar.style.background = '#7EFFBA';
        progressBar.style.marginTop = '200px';
        sub.unsubscribe();
      }

      this.currentMinute = ((this.progressEndValue - (sec * 100)) / 60).toFixed(0);

      if (this.currentMinute.length === 5) {
        this.currentMinute = this.currentMinute.charAt(0) + this.currentMinute.charAt(1);
      } else if (this.currentMinute.length === 4) {
        this.currentMinute = this.currentMinute.charAt(0);
      } else {
        this.currentMinute = '1';
      }

      this.progressValue = Number.parseFloat((this.progressValue + 0.1).toFixed(1));

      if ((this.progressValue / this.tempValue).toFixed(0) === (this.currentPercent + 1).toString()) {
        this.currentPercent += 1;

        progressBar.style.background = 'conic-gradient(' +
          '#85D4FF' + ' ' + this.currentPercent * 3.6 + 'deg,' +
          '#BCE8FF' + ' ' + this.currentPercent * 3.6 + 'deg' +
          ')';
      }

      if (this.progressValue === this.progressEndValue / 1000) {
        this.isQueueSoon = true;
        console.log("ve88IfBbh9 :: this.isQueueSoon : ", this.isQueueSoon);
        sub.unsubscribe();
      }
    });
  };

  getWaitingTime(): number {
    return this.numberOfPeople * 5; // for each person gives 5 minutes
  }
}
