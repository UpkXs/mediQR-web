import { Component, OnInit } from '@angular/core';
import {Room} from "../../model/Room";
import {RoomController} from "../../controllers/RoomController";
import {SubSink} from "../../utils/SubSink";
import {Reason} from "../../model/Reason";
import {generateRandomString} from "../../utils/GenerateRandomString";
import {Router} from "@angular/router";
import {DonePageService} from "../done-page/done-page.service";

@Component({
  selector: 'mediQR-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  room: Room;
  isOpenPopover: boolean = false;
  reason: Reason;

  private readonly subs = new SubSink();
  verificationCode: string;
  roomNumber: number;
  name: string;
  surname: string;
  patronymic: string;
  phoneNumber: number;
  reasonsToVisit: string[] = [];

  constructor(
    private readonly roomController: RoomController,
    private readonly donePageService: DonePageService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.verificationCode = generateRandomString(5);
  }

  async save() {
    if (this.name &&
      this.surname &&
      this.patronymic &&
      this.phoneNumber &&
      this.roomNumber && this.reasonsToVisit) {

      this.room = {
        verificationCode: this.verificationCode,
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        phoneNumber: this.phoneNumber,
        roomNumber: this.roomNumber,
        reasonsOne: this.reasonsToVisit[0],
        reasonsTwo: this.reasonsToVisit[1],
        reasonsThree: this.reasonsToVisit[2],
      }

      console.log('Y230sY1z :: ' , this.room);

      await this.roomController.addRoom(this.room).pipe().toPromise();

      this.donePageService.verificationCode = this.verificationCode;
      this.router.navigate(['/done-page']).then();
    }
  }

  openDropdown() {
    this.isOpenPopover = !this.isOpenPopover;
  }

  // getReasonsToVisit(): Reason[] {
  //   let reasonsToVisit: Reason[] = []; // Initialize as an empty array
  //   this.reasonsToVisitMap.forEach((name, id) => {
  //     let reason: Reason = { id: id, name: name }; // Create a new reason object for each iteration
  //     console.log('01sEUN5G :: ', reason);
  //     reasonsToVisit.push(reason);
  //   });
  //   return reasonsToVisit;
  // }


  addToList(id: string) {
    console.log('CU88f3u1 :: ', id);
    this.reasonsToVisit.push(id);
  }
}
