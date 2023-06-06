import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mediQR-call-next-overlay',
  templateUrl: './call-next-overlay.component.html',
  styleUrls: ['./call-next-overlay.component.scss']
})
export class CallNextOverlayComponent implements OnInit {
  @Input() currentCalledQueueNumber: number;
  @Output() approved = new EventEmitter<boolean>();
  @Output() canceled = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  callNextQueue() {
    this.approved.emit(true);
  }

  cancel() {
    this.canceled.emit(true);
  }
}
