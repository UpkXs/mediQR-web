import { Component, OnInit } from '@angular/core';
import {DonePageService} from "./done-page.service";

@Component({
  selector: 'mediQR-done-page',
  templateUrl: './done-page.component.html',
  styleUrls: ['./done-page.component.scss']
})
export class DonePageComponent implements OnInit {

  verificationCode: string;

  constructor(
    private readonly donePageService: DonePageService,
  ) { }

  ngOnInit() {
    this.verificationCode = this.donePageService.verificationCode;
  }

}
