import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Queue} from "../../model/Queue";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {QueuePageService} from "./queue-page.service";

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
  isEnableNotificationDialogOpen: boolean;
  isFirstTimeToNotification: boolean = true;
  isClickedNotify: boolean = false;

  private readonly subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly queuePageController: QueuePageController,
    private readonly queuePageService: QueuePageService,
  ) { }

  async ngOnInit() {
    this.queueId = this.queuePageService.queueId;
    this.queueCode = this.queuePageService.queueCode;
    this.queueNumber = this.queuePageService.queueNumber;
    this.verificationCode = this.queuePageService.verificationCode;
    this.reason = this.queuePageService.reason;
    this.queueCount = this.queuePageService.queueCount;
    this.queueCountWithoutMe = this.queuePageService.queueCountWithoutMe;
  }

  leaveQueueAndLogout() {
    this.delete = true;
  }

  cancel() {
    this.delete = false;
  }

  approve(queueId: string) {
    this.delete = false;

    this.queuePageService.leaveQueueAndLogout(queueId);
  }

  isYourTurnNow() {
    this.isYourTurn = true;
    this.isYourTurnDialogOpen = true;
  }

  clear() {
    this.isYourTurnDialogOpen = false;
  }

  enableNotification() {
    this.isClickedNotify = true;
    if (this.isFirstTimeToNotification) {
      this.isEnableNotificationDialogOpen = true;
    } else {
      this.isFirstTimeToNotification = false;
      this.isEnableNotificationDialogOpen = true;
    }
  }

  gotIt() {
    this.isEnableNotificationDialogOpen = false;
    this.isFirstTimeToNotification = false;
  }

  cancelNotification() {
    this.isClickedNotify = false;
    this.isFirstTimeToNotification = true;
    this.isEnableNotificationDialogOpen = false;
  }

  approveNotification() {
    this.isFirstTimeToNotification = false;
    this.isEnableNotificationDialogOpen = true;
  }
}
