import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'mediQR-your-turn-overlay',
  templateUrl: './your-turn-overlay.component.html',
  styleUrls: ['./your-turn-overlay.component.scss']
})
export class YourTurnOverlayComponent implements OnInit {

  @Input() subTitle: string;
  @Input() description: string;
  @Input() buttonText: string;
  @Output() cleared = new EventEmitter<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  clear() {
    this.cleared.emit(true);
  }
}
