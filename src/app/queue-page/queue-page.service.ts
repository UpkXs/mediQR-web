import { Injectable } from '@angular/core';
import {tap} from "rxjs";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QueuePageService {

  queueId: string;
  verificationCode: string;
  queueCode: number;
  queueNumber: number;
  reason: string;
  queueCount: number;
  queueCountWithoutMe: number;

  deleted: boolean = false;
  private readonly subs = new SubSink();

  constructor(
    private readonly router: Router,
    private readonly queuePageController: QueuePageController,
  ) { }

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

  leaveQueueById(queueId: string) {
    this.subs.sink = this.queuePageController.leaveQueueById(queueId).subscribe();
  }

}
