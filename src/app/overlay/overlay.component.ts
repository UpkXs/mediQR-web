import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QueuePageService} from "../queue-page/queue-page.service";

@Component({
  selector: 'mediQR-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {

  @Input() queueId: string;
  @Output() canceled = new EventEmitter<boolean>();

  deleted: boolean;

  constructor(
    private readonly queuePageService: QueuePageService,
  ) { }

  leaveQueueAndLogout(queueId: string) {
    this.deleted = true;
    this.queuePageService.leaveQueueAndLogout(queueId);
  }

  cancel() {
    this.deleted = false;
    this.canceled.emit(true);
  }
}
