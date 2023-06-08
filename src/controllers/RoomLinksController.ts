import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomLinks} from "../model/RoomLinks";

@Injectable({providedIn: 'root'})
export class RoomLinksController{

  api: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getRoomLinksByVerificationCode(verificationCode: string): Observable<RoomLinks> {
    return this.http.post<RoomLinks>(this.api + '/get-room-links-by-verification-code/verificationCode', verificationCode);
  }

}
