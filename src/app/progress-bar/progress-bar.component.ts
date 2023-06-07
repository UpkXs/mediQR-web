import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {interval, tap} from "rxjs";
import {QueuePageService} from "../queue-page/queue-page.service";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";

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
  currentMinuteToShow: string = '1';
  isQueueSoon: boolean = false;

  prevPeopleNumber: number;
  temp: number = 0;

  private readonly subs = new SubSink();

  constructor(
    private readonly queuePageService: QueuePageService,
    private readonly queuePageController: QueuePageController,
  ) {
  }

  ngOnInit(): void {
    this.progressEndValue = this.getWaitingTime() * 60 * 1000; // in milliseconds
    this.progressValue = 0;
    this.tempValue = this.getWaitingTime() * 0.6;
  }

  async loadQueueCountWithoutMe(queueId: string) {
    await this.queuePageController.loadFrontMeQueueCountWithoutMe(queueId)
      .pipe(
        tap((countWithoutMe) => {
          this.prevPeopleNumber = this.numberOfPeople;

          this.numberOfPeople = countWithoutMe;

          if (this.numberOfPeople !== this.prevPeopleNumber) {
            this.temp = this.prevPeopleNumber - this.numberOfPeople;
          }
        })
      ).toPromise();
  }

  ngAfterViewInit() {
    let progressBar = this.progBar.nativeElement;

    this.currentPercent = 0;

    const progressValueS = localStorage.getItem('progress-bar-progressValue-' + this.queueId);
    const currentPercentS = localStorage.getItem('progress-bar-currentPercent-' + this.queueId);
    const currentMinuteS = localStorage.getItem('progress-bar-currentMinute-' + this.queueId);
    const currentMinuteToShowS = localStorage.getItem('progress-bar-currentMinuteToShow-' + this.queueId);
    const secS = localStorage.getItem('progress-bar-sec-' + this.queueId);

    if (progressValueS && currentPercentS && currentMinuteS && currentMinuteToShowS) {
      this.progressValue = Number(progressValueS);
      this.currentPercent = Number(currentPercentS);
      this.currentMinute = currentMinuteS;
      this.currentMinuteToShow = currentMinuteToShowS;
    }

    const timer$ = interval(100);

    const sub = timer$.subscribe((sec) => {

      if (sec % 10 === 0) {
        this.loadQueueCountWithoutMe(this.queueId).then();
      }

      if (this.temp !== 0) {
        this.progressValue = this.progressValue + (this.temp * 1 * 60); // for each person gives 1 minutes

        this.currentMinute = String(Number(this.currentMinute) - this.temp * 1); // for each person gives 1 minutes

        this.currentPercent = this.currentPercent + (100 / this.progressEndValue) * (this.temp * 1 * 60 * 1000); // for each person gives 1 minutes
        this.currentPercent = Number(this.currentPercent.toFixed(0));

        if (Number(this.currentMinute) < 0) {
          this.currentMinuteToShow = '1';
        } else {
          if (this.currentMinute.length === 5) {
            this.currentMinuteToShow = this.currentMinute.charAt(0) + this.currentMinute.charAt(1);
          } else if (this.currentMinute.length === 4) {
            this.currentMinuteToShow = this.currentMinute.charAt(0);
          } else {
            this.currentMinuteToShow = '1';
          }
        }

        this.temp = 0;

        progressBar.style.background = 'conic-gradient(' +
          '#85D4FF' + ' ' + this.currentPercent * 3.6 + 'deg,' +
          '#BCE8FF' + ' ' + this.currentPercent * 3.6 + 'deg' +
          ')';
      }

      if (secS) {
        sec = Number(secS) + sec;
      }

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

      if (Number(this.currentMinute) < 0) {
        console.log('2ts9yJcJ :: this.currentMinuteToShow < 0 : ', this.currentMinuteToShow);
        this.currentMinuteToShow = '1';
        console.log('2ts9yJcJ :: this.currentMinuteToShow : ', this.currentMinuteToShow);
      } else {
        if (this.currentMinute.length === 5) {
          this.currentMinuteToShow = this.currentMinute.charAt(0) + this.currentMinute.charAt(1);
        } else if (this.currentMinute.length === 4) {
          this.currentMinuteToShow = this.currentMinute.charAt(0);
        } else {
          this.currentMinuteToShow = '1';
        }
      }

      this.progressValue = Number.parseFloat((this.progressValue + 0.1).toFixed(1));

      localStorage.setItem('progress-bar-progressValue-' + this.queueId, String(this.progressValue));
      localStorage.setItem('progress-bar-currentPercent-' + this.queueId, String(this.currentPercent));
      localStorage.setItem('progress-bar-currentMinute-' + this.queueId, this.currentMinute);
      localStorage.setItem('progress-bar-currentMinuteToShow-' + this.queueId, this.currentMinuteToShow);
      localStorage.setItem('progress-bar-sec-' + this.queueId, String(sec));

      if ((this.progressValue / this.tempValue).toFixed(0) === (this.currentPercent + 1).toString()) {
        this.currentPercent += 1;

        console.log('C90qs5lg :: this.currentPercent : ', this.currentPercent);

        progressBar.style.background = 'conic-gradient(' +
          '#85D4FF' + ' ' + this.currentPercent * 3.6 + 'deg,' +
          '#BCE8FF' + ' ' + this.currentPercent * 3.6 + 'deg' +
          ')';
      }

      if (Number(this.currentMinuteToShow) < 0) {
        console.log('2ts9yJcJ :: this.currentMinuteToShow < 0 : ', this.currentMinuteToShow);
        this.currentMinuteToShow = '1';
        console.log('2ts9yJcJ :: this.currentMinuteToShow : ', this.currentMinuteToShow);
      }

      if (this.progressValue === this.progressEndValue / 1000) {
        this.isQueueSoon = true;
        console.log("ve88IfBbh9 :: this.isQueueSoon : ", this.isQueueSoon);

        localStorage.setItem('progress-bar-progressValue-' + this.queueId, String(this.progressEndValue));

        sub.unsubscribe();
      }
    });
  };

  getWaitingTime(): number {
    return this.numberOfPeople * 1; // for each person gives 1 minutes
  }
}
