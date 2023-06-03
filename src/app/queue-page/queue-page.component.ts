import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {generateRandomNumber, generateRandomUtil} from "../../utils/GenerateRandomUtil";

@Component({
  selector: 'mediQR-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnInit {
  reason: string;
  locationName: string = 'Algamed in Almaty'
  verificationCode: string;
  queueNumber: number;

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reason = params['reason'];
    });

    this.verificationCode = generateRandomUtil(5);
    this.queueNumber = generateRandomNumber(3);
  }


}
