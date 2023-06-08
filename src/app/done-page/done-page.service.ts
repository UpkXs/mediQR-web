import {Injectable} from '@angular/core';
import {Room} from "../../model/Room";
import {RoomLinks} from "../../model/RoomLinks";

@Injectable({
  providedIn: 'root'
})
export class DonePageService {

  verificationCode: string;
  room: Room;
  roomLinks: RoomLinks;

  constructor() {
  }

}
