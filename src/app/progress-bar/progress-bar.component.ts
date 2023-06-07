import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {interval} from "rxjs";
import {QueuePageService} from "../queue-page/queue-page.service";

@Component({
  selector: 'mediQR-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() queueId: string;
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

  constructor(
    private readonly queuePageService: QueuePageService,
  ) {
  }

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

      if (this.numberOfPeople === 0) {
        this.isQueueSoon = true;
        progressBar.style.background = '#85D4FF';
      }

      if (this.isYourTurn) {
        this.queuePageService.leaveQueueById(this.queueId);
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

      // localStorage.setItem('progressValue', this.progressValue.toString());
      // localStorage.setItem('currentPercent', this.currentPercent.toString());
      // const progressValueS = localStorage.getItem('progressValue');
      // const currentPercentS = localStorage.getItem('currentPercent');
      // console.log('n0AM1wk1 :: progressValueS : ', progressValueS)
      // console.log('e2efC3Jr :: currentPercentS : ', currentPercentS)

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
    return this.numberOfPeople * 2; // for each person gives 2 minutes
  }
}
