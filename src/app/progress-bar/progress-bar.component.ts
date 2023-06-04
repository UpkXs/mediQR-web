import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'mediQR-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() queueNumber: number;
  @Input() numberOfPeople: number;

  @ViewChild('progBar', { static: true }) progBar: ElementRef;
  @ViewChild('progContainer', { static: true }) progContainer: ElementRef;

  progressValue = 0;
  progressEndValue = 0;
  tempValue = 0;
  currentPercent = 0;

  ngOnInit(): void {
    this.progressEndValue = this.getWaitingTime() * 60 * 1000; // in milliseconds
    this.progressValue = 0;
    this.tempValue = this.getWaitingTime() * 0.6;
  }

  ngAfterViewInit() {
    let progressBar = this.progBar.nativeElement;
    let progressContainer = this.progContainer.nativeElement;

    this.currentPercent = 0;

    const timer$ = interval(100);

    const sub = timer$.subscribe((sec) => {
      this.progressValue = Number.parseFloat((this.progressValue + 0.1).toFixed(1));

      if ((this.progressValue / this.tempValue).toFixed(0) === (this.currentPercent + 1).toString()) {

        this.currentPercent += 1;

        progressContainer.textContent = this.currentPercent.toString() + '%';
        progressBar.style.background = 'conic-gradient(' +
          '#4d5bf9' + ' ' + this.currentPercent * 3.6 + 'deg,' +
          '#cadcff' + ' ' + this.currentPercent * 3.6 + 'deg' +
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
