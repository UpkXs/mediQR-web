import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QueuePageService} from "../queue-page/queue-page.service";

@Component({
  selector: 'mediQR-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {

  @Input() subTitle: string;
  @Input() description: string;
  @Input() cancelBtnText: string;
  @Input() approveBtnText: string;
  @Input() queueId: string;
  @Input() verificationCode: string;
  @Output() canceled = new EventEmitter<boolean>();
  @Output() approved = new EventEmitter<string>();

  deleted: boolean;

  constructor() { }

  approve(queueId: string) {
    this.deleted = true;
    this.approved.emit(queueId);
  }

  cancel() {
    this.deleted = false;
    this.canceled.emit(true);
  }
}
