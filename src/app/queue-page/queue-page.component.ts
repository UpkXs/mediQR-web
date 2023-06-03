import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'mediQR-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.scss']
})
export class QueuePageComponent implements OnInit {
  reason: string;
  locationName: string = 'Algamed in Almaty'
  verificationCode: string = '7X1wi';
  queue: string = '309109';

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reason = params['reason'];
    });
  }

}
