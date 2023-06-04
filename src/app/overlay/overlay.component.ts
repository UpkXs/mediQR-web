import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {SubSink} from "../../utils/SubSink";
import {QueuePageController} from "../../controllers/QueuePageController";
import {Router} from "@angular/router";

@Component({
  selector: 'mediQR-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  @Input() queueId: string;
  @Input() reason: string;

  @ViewChild('overlay', {static: true}) overlay: ElementRef;

  deleted: boolean;

  private readonly subs = new SubSink();

  constructor(
    private readonly router: Router,
    private readonly queuePageController: QueuePageController,
  ) { }

  ngOnInit(): void {
  }

  leaveQueueAndLogout(queueId: string) {
    this.subs.sink = this.queuePageController.leaveQueueById(queueId).pipe(
      tap((deleted) => {
        this.deleted = !!deleted;
      }),
      tap(() => {
        if (this.deleted) {
          this.router.navigate(['/welcome-page']).then();
        }
      })
    ).subscribe();
  }

  cancel() {
    console.log('baSUtbBO :: this.queueId : ', this.queueId);
    console.log('baSUtbBO :: cancel()');
    let progressBar = this.overlay.nativeElement;
    progressBar.style.visibility = 'visible';
    progressBar.style.opacity = 1;

    this.router.navigate(['/queue-page', this.reason]).then();
  }
}
