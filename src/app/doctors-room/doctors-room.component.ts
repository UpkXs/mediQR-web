import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'mediQR-doctors-room',
  templateUrl: './doctors-room.component.html',
  styleUrls: ['./doctors-room.component.scss']
})
export class DoctorsRoomComponent implements OnInit {
  verificationCode: string;

  constructor(
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verificationCode = params['verificationCode'];
    });
  }

}
