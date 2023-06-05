import { Injectable } from '@angular/core';
import {tap} from "rxjs";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class QueuePageService {

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

}
