import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {generateRandomNumber, generateRandomString} from "../../utils/GenerateRandomString";
import {Queue} from "../../model/Queue";

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

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reason = params['reason'];
    });

    this.queueId = generateRandomString(10);
    this.verificationCode = generateRandomString(5);
    this.queueNumber = generateRandomNumber(3);
    this.queueCode = generateRandomNumber(6);
  }


}
