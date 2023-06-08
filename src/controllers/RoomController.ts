import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Room} from "../model/Room";

@Injectable({providedIn: 'root'})
export class RoomController {

  api: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  addRoom(room: Room): Observable<number> {
    return this.http.post<number>(this.api + '/addRoom/room', room);
  }
}
