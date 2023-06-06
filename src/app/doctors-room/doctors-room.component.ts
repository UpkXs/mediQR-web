import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QueuePageController} from "../../controllers/QueuePageController";
import {SubSink} from "../../utils/SubSink";
import {finalize, tap} from "rxjs";

@Component({
  selector: 'mediQR-doctors-room',
  templateUrl: './doctors-room.component.html',
  styleUrls: ['./doctors-room.component.scss']
})
export class DoctorsRoomComponent implements OnInit {
  verificationCode: string;
  queueCount: number;
  isQueueNotEmpty: boolean;

  previousCalledQueueNumber: string = '000';
  currentCalledQueueNumber: number;

  queueNumberWithOrderIndexMap: Map<number, number> = new Map<number, number>();

  isCallNext: boolean = false;
  isCallByNumber: boolean = false;

  private readonly subs = new SubSink();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly queuePageController: QueuePageController,
  ) { }

  async ngOnInit() {
    this.route.params.subscribe((params) => {
      this.verificationCode = params['verificationCode'];
    });

    await this.loadQueueCount();
    await this.loadQueueNumberAndOrderIndex();
  }

  async loadQueueCount() {
    this.subs.sink = await this.queuePageController.loadQueueCount().pipe(
      tap((count) => {
        this.queueCount = count;
        this.isQueueNotEmpty = !!count;
      })
    ).subscribe()
  }

  loadQueueNumberAndOrderIndex(): Promise<void> {
    this.queueNumberWithOrderIndexMap = new Map<number, number>();

    return new Promise<void>((resolve) => {
      this.subs.sink = this.queuePageController.loadAllQueue().pipe(
        tap((queues) => {
          queues.forEach((queue) => {
            if (queue.orderIndex != null) {
              this.queueNumberWithOrderIndexMap.set(queue.queueNumber, queue.orderIndex);
            }
          });
        }),
        tap((queues) => {
          queues.forEach((queue) => {
            console.log('z8g8xT35sm :: queue : ', queue);
          })
        }),
        finalize(() => {
          resolve();
        })
      ).subscribe();
    });
  }

  getQueueNumberWithLowestOrderIndex() {
    const queueArray = Array.from(this.queueNumberWithOrderIndexMap.entries());

    if (queueArray.length === 0) {
      // Map is empty, handle this case accordingly
      return null;
    }

    const nextQueue = queueArray.reduce(
      (minQueue: { queueNumber: number, orderIndex: number } | null, [queueNumber, orderIndex]: [number, number]) => {
        if (minQueue === null || orderIndex < minQueue.orderIndex) {
          return { queueNumber, orderIndex };
        }
        return minQueue;
      },
      null as { queueNumber: number, orderIndex: number } | null
    );

    return nextQueue;
  }

  async approveAndCloseDialog() {
    this.isCallNext = false;

    await this.changePrevQueueAndCallNextOne();
  }

  async callByNumberAndCloseDialog(selectedButton: number) {
    this.isCallByNumber = false;

    this.currentCalledQueueNumber = selectedButton;

    await this.changePrevQueueAndCallNextOne();
  }

  async changePrevQueueAndCallNextOne() {
    this.previousCalledQueueNumber = this.currentCalledQueueNumber.toString();

    this.subs.sink = await this.queuePageController.setIsYourTurn(this.currentCalledQueueNumber).pipe(
      tap(() => {
        this.subs.sink = this.queuePageController.leaveQueueByNumber(this.currentCalledQueueNumber).subscribe();
      }),
      tap(() => {
        this.loadQueueCount();
      })
    ).subscribe();
  }

  async callNextQueue() {
    this.isCallNext = true;

    await this.loadNextQueueNumber();
  }

  async loadNextQueueNumber() {
    await this.loadQueueNumberAndOrderIndex();

    if (this.isCallNext && !this.isCallByNumber) {
      let nextQueue = await this.getQueueNumberWithLowestOrderIndex();
      if (nextQueue) {
        this.currentCalledQueueNumber = nextQueue.queueNumber;
      }
    }
  }

  cancel() {
    this.isCallNext = false;
  }

  async callByQueueNumber() {
    this.isCallByNumber = true;

    await this.loadNextQueueNumber();
  }
}
