import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {tap} from "rxjs";

@Component({
  selector: 'mediQR-doctors-room',
  templateUrl: './doctors-room.component.html',
  styleUrls: ['./doctors-room.component.scss']
})
export class DoctorsRoomComponent implements OnInit { //todo aro x8qCepZF save prev queueId
  verificationCode: string;
  queueCount: number;
  isQueueEmpty: boolean;

  private readonly subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly queuePageController: QueuePageController,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verificationCode = params['verificationCode'];
    });

    this.loadQueueCount();
  }

  loadQueueCount() {
    this.subs.sink = this.queuePageController.loadQueueCount().pipe(
      tap((count) => {
        this.queueCount = count;
        this.isQueueEmpty = !!count;
      })
    ).subscribe()
  }

}
