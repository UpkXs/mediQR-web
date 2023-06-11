import {Component, OnInit} from '@angular/core';
import {SubSink} from "../../utils/SubSink";
import {WelcomePageController} from "../../controllers/WelcomePageController";
import {ActivatedRoute, Router} from "@angular/router";
import {take, tap} from "rxjs";
import {generateQueueNumber, generateRandomNumber, generateRandomString} from "../../utils/GenerateRandomString";
import {QueuePageController} from "../../controllers/QueuePageController";
import {QueuePageService} from "../queue-page/queue-page.service";
import {Queue} from "../../model/Queue";

@Component({
  selector: 'mediQR-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  isOpenPopover: boolean = false;
  reason: string = 'Choose';

  reasonsMap: Map<string, string> = new Map<string, string>();

  verificationCode: string;
  queueId: string;
  queueCode: number;
  queueNumber: number;

  queue: Queue;
  queueCount: number;
  queueCountWithoutMe: number;

  private readonly subs = new SubSink();

  constructor(
    private readonly welcomePageController: WelcomePageController,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly queuePageController: QueuePageController,
    private readonly queuePageService: QueuePageService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const verificationCodeS  = params.get('verificationCode');
      if (verificationCodeS) {
        this.verificationCode = verificationCodeS;
      }
    });
    // this.verificationCode = generateRandomString(5); // todo aro zKFxBU0E get from sms or link server db
    console.log('yEv0O8Le :: this.verificationCode : ', this.verificationCode);
    this.loadReasons();
  }

  openOrClosePopover() {
    this.isOpenPopover = !this.isOpenPopover;
  }

  loadReasons() {
    this.subs.sink = this.welcomePageController.loadReasons()
      .pipe(
        tap((reasons) => {
          reasons.forEach((reason) => {
            this.reasonsMap.set(reason.id, reason.name);
          })
        })
      ).subscribe();
  }

  onChange(value: string) {
    this.reason = value;
  }

  isReasonSelected(): boolean {
    return this.reason !== 'Choose';
  }

  async nextBtnClicked() {
    this.queueId = generateRandomString(10);

    await this.queuePageController.loadAllQueueCount()
      .pipe(
        tap((count) => {
          this.queueNumber = count;
        }),
        take(1)
      ).toPromise();

    this.queueNumber = generateQueueNumber(this.queueNumber);

    this.queueCode = generateRandomNumber(6);

    await this.addQueueAndLoadQueueCounts();

    this.navigateNextPage();
  }

  async addQueueAndLoadQueueCounts() {
    this.queue = {
      queueId: this.queueId,
      verificationCode: this.verificationCode,
      queueCode: this.queueCode,
      queueNumber: this.queueNumber,
      reason: this.reason,
      isLeaved: false,
      isYourTurn: false,
    }

    await this.queuePageController.addQueue(this.queue).toPromise();

    await this.loadQueueCount();
    await this.loadQueueCountWithoutMe(this.queueId);
  }

  async loadQueueCount() {
    await this.queuePageController.loadQueueCount()
      .pipe(
        tap((count) => {
          this.queueCount = count;
          console.log("x49k8z0z :: this.queueCount : ", this.queueCount);
        })
      ).toPromise();
  }

  async loadQueueCountWithoutMe(queueId: string) {
    await this.queuePageController.loadQueueCountWithoutMe(queueId)
      .pipe(
        tap((countWithoutMe) => {
          this.queueCountWithoutMe = countWithoutMe;
          console.log("25yeH9kM :: this.queueCountWithoutMe : ", this.queueCountWithoutMe);
        })
      ).toPromise();
  }

  navigateNextPage() {
    this.queuePageService.queueId = this.queueId;
    this.queuePageService.queueCode = this.queueCode;
    this.queuePageService.queueNumber = this.queueNumber;
    this.queuePageService.verificationCode = this.verificationCode;
    this.queuePageService.reason = this.reason;
    this.queuePageService.queueCount = this.queueCount;
    this.queuePageService.queueCountWithoutMe = this.queueCountWithoutMe;
    this.router.navigate(['/queue-page', this.queueId]).then();
  }
}
