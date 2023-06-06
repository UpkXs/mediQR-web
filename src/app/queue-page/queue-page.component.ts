import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {generateRandomNumber, generateRandomString} from "../../utils/GenerateRandomString";
import {Queue} from "../../model/Queue";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {tap} from "rxjs";

@Component({
  selector: 'mediQR-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnInit {
  reason: string;
  locationName: string = 'Algamed in Almaty'
  verificationCode: string;
  queueId: string;
  queueCode: number;
  queueNumber: number;

  queue: Queue;
  queueCount: number;
  queueCountWithoutMe: number;

  delete: boolean = false;
  isYourTurn: boolean = false;
  isYourTurnDialogOpen: boolean;

  private readonly subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly queuePageController: QueuePageController,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.verificationCode = params['verificationCode'];
      this.reason = params['reason'];
    });

    this.queueId = generateRandomString(10);
    this.queueNumber = generateRandomNumber(3);
    this.queueCode = generateRandomNumber(6);

    this.addQueueAndLoadQueueCounts();
  }

  addQueueAndLoadQueueCounts() {
    this.subs.sink = this.queuePageController.addQueue({
      queueId: this.queueId,
      verificationCode: this.verificationCode,
      queueCode: this.queueCode,
      queueNumber: this.queueNumber,
      reason: this.reason,
      isLeaved: false,
      isYourTurn: false,
    }).subscribe(() => {
      this.loadQueueCount();
      this.loadQueueCountWithoutMe(this.queueId);
    });
  }

  loadQueueCount() {
    this.subs.sink = this.queuePageController.loadQueueCount().pipe(
      tap((count) => {
        this.queueCount = count;
        console.log("x49k8z0z :: this.queueCount : ", this.queueCount);
      })
    ).subscribe();
  }

  loadQueueCountWithoutMe(queueId: string) {
    this.subs.sink = this.queuePageController.loadQueueCountWithoutMe(queueId).pipe(
      tap((countWithoutMe) => {
        this.queueCountWithoutMe = countWithoutMe;
        console.log("25yeH9kM :: this.queueCountWithoutMe : ", this.queueCountWithoutMe);
      })
    ).subscribe();
  }

  leaveQueueAndLogout() {
    this.delete = true;
  }

  cancel() {
    this.delete = false;
  }

  enableNotification() {
    this.isYourTurn = true;
    this.isYourTurnDialogOpen = true;
  }

  clear() {
    this.isYourTurnDialogOpen = false;
  }
}
