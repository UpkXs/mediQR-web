import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
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
    this.route.params.subscribe((params: Params) => {
      this.queueId = params['queueId'];
    });
    this.queueCode = this.queuePageService.queueCode;
    this.queueNumber = this.queuePageService.queueNumber;
    this.verificationCode = this.queuePageService.verificationCode;
    this.reason = this.queuePageService.reason;
    this.queueCount = this.queuePageService.queueCount;
    this.queueCountWithoutMe = this.queuePageService.queueCountWithoutMe;

    this.saveInLocalStorage();
  }

  saveInLocalStorage() {
    if (this.queueId && this.queueNumber && this.queueCount && this.queueCountWithoutMe) {
      localStorage.setItem('queueLocalStorage.queueId-' + this.queueId, this.queueId);
      localStorage.setItem('queueLocalStorage.queueNumber-' + this.queueId, String(this.queueNumber));
      localStorage.setItem('queueLocalStorage.queueCount-' + this.queueId, String(this.queueCount));
      localStorage.setItem('queueLocalStorage.queueCountWithoutMe-' + this.queueId, String(this.queueCountWithoutMe));
      localStorage.setItem('queueLocalStorage.queueCode-' + this.queueId, String(this.queueCode));
      localStorage.setItem('queueLocalStorage.verificationCode-' + this.queueId, String(this.verificationCode));
      localStorage.setItem('queueLocalStorage.reason-' + this.queueId, String(this.reason));
    }

    const queueIdS = localStorage.getItem('queueLocalStorage.queueId-' + this.queueId);
    const queueNumberS = localStorage.getItem('queueLocalStorage.queueNumber-' + this.queueId);
    const queueCountS = localStorage.getItem('queueLocalStorage.queueCount-' + this.queueId);
    const queueCountWithoutMeS = localStorage.getItem('queueLocalStorage.queueCountWithoutMe-' + this.queueId);
    const queueCodeS = localStorage.getItem('queueLocalStorage.queueCode-' + this.queueId);
    const verificationCodeS = localStorage.getItem('queueLocalStorage.verificationCode-' + this.queueId);
    const reasonS = localStorage.getItem('queueLocalStorage.reason-' + this.queueId);

    if (queueIdS && queueNumberS && queueCountS && queueCountWithoutMeS && queueCodeS && verificationCodeS && reasonS) {
      this.queueId = queueIdS;
      this.queueNumber = Number(queueNumberS);
      this.queueCount = Number(queueCountS);
      this.queueCountWithoutMe = Number(queueCountWithoutMeS);
      this.queueCode = Number(queueCodeS);
      this.verificationCode = verificationCodeS;
      this.reason = reasonS;
    }
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
