import { Component, OnInit } from '@angular/core';
import {Room} from "../../model/Room";
import {RoomLinks} from "../../model/RoomLinks";
import {DonePageService} from "../done-page/done-page.service";

@Component({
  selector: 'mediQR-poster-page',
  templateUrl: './poster-page.component.html',
  styleUrls: ['./poster-page.component.scss']
})
export class PosterPageComponent implements OnInit {

  room: Room;
  roomLinks: RoomLinks;

  constructor(
    private readonly donePageService: DonePageService,
  ) { }

  ngOnInit(): void {

    this.room = this.donePageService.room;
    this.roomLinks = this.donePageService.roomLinks;

    console.log('6r4iTd44 :: ', this.room);
    console.log('6r4iTd44 :: ', this.roomLinks);
  }

}
