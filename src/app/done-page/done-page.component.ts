import { Component, OnInit } from '@angular/core';
import {DonePageService} from "./done-page.service";
import {generateRandomString} from "../../utils/GenerateRandomString";
import {take, tap} from "rxjs";
import {RoomLinksController} from "../../controllers/RoomLinksController";
import {RoomController} from "../../controllers/RoomController";
import {Room} from "../../model/Room";
import {RoomLinks} from "../../model/RoomLinks";
import {Router} from "@angular/router";

@Component({
  selector: 'mediQR-done-page',
  templateUrl: './done-page.component.html',
  styleUrls: ['./done-page.component.scss']
})
export class DonePageComponent implements OnInit {

  qrLink: string = 'https://mediqr.kz/algamed/room/7X1wi';
  qrPoster: string = 'https://mediqr.kz/poster/algamed/room/7X1wi';
  roomLink: string = 'https://mediqr.kz/algamed/room/7X1wi/F_yLzLA-27TRzma--XEAR';

  room: Room;
  roomLinks: RoomLinks;
  roomInfo: string;

  verificationCode: string;

  constructor(
    private readonly donePageService: DonePageService,
    private readonly router: Router,
    private readonly roomLinksController: RoomLinksController,
    private readonly roomController: RoomController,
  ) { }

  async ngOnInit() {
    this.verificationCode = this.donePageService.verificationCode;

    await this.getRoomLinksByVerificationCode();

    await this.getRoomByVerificationCode();

    console.log('OeYyIXrI :: this.room : ', this.room);
    this.roomInfo = this.room.name + ' ' + this.room.surname + ' ' + this.room.patronymic;
  }

  async getRoomLinksByVerificationCode() {
    await this.roomLinksController.getRoomLinksByVerificationCode(this.verificationCode)
      .pipe(
        tap((roomLinks) => {
          this.qrLink = roomLinks.qrLink;
          this.qrPoster = roomLinks.qrPoster;
          this.roomLink = roomLinks.roomLink;

          this.roomLinks = {
            verificationCode: this.verificationCode,
            qrLink: this.qrLink,
            qrPoster: this.qrPoster,
            roomLink: this.roomLink
          }
        }),
        take(1)
      ).toPromise();
  }

  async getRoomByVerificationCode() {
    await this.roomController.getRoomByVerificationCode(this.verificationCode)
      .pipe(
        tap((room) => {
          this.room = room;
        }),
        take(1)
      ).toPromise();
  }

  navigateToPoster() {

    this.donePageService.room = this.room;
    this.donePageService.roomLinks = this.roomLinks;

    this.router.navigate(['/poster-page']).then();
  }
}
