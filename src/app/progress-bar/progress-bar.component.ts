import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

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
  progressEndValue = 100;
  speed = 50;

  ngAfterViewInit() {
    let progressBar = this.progBar.nativeElement;
    let progressContainer = this.progContainer.nativeElement;

    let progress = setInterval(() => {
      this.progressValue++;
      console.log("fnxEQv67 :: this.progressValue : ", this.progressValue)
      progressContainer.textContent = this.progressValue + '%';
      progressBar.style.background = 'conic-gradient(' +
        '#4d5bf9' + ' ' + this.progressValue * 3.6 + 'deg,' +
        '#cadcff' + ' ' + this.progressValue * 3.6 + 'deg' +
        ')';
      if (this.progressValue === this.progressEndValue) {
        clearInterval(progress)
      }
    }, this.speed)
  };
}
