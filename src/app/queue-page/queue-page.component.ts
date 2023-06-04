import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {generateRandomNumber, generateRandomString} from "../../utils/GenerateRandomString";
import {Queue} from "../../model/Queue";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";

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
  isLeaved: boolean = false;

  queue: Queue;

  private readonly subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly queuePageController: QueuePageController,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.reason = params['reason'];
    });

    this.queueId = generateRandomString(10);
    this.verificationCode = generateRandomString(5);
    this.queueNumber = generateRandomNumber(3);
    this.queueCode = generateRandomNumber(6);

    await this.addQueue();
  }

  addQueue() {
    this.subs.sink = this.queuePageController.addQueue({
      queueId: this.queueId,
      verificationCode: this.verificationCode,
      queueCode: this.queueCode,
      queueNumber: this.queueNumber,
      reason: this.reason,
      isLeaved: false,
    }).subscribe();
  }


  getPeopleCount(): number {
    // todo aro get from server count of people in queue
    return 1;
  }
}
