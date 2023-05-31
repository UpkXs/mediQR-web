import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Reason} from "../model/Reason";
import {HttpClient, HttpRequest, HttpResponse} from "@angular/common/http";
import {mapBody} from "../utils/RzJsUtil";

@Injectable({providedIn: 'root'})
export class WelcomePageController {

  constructor(private http: HttpClient) {
  }

  loadReasons(): Observable<Reason> {
    console.log('Ocq4Fs2s6Q :: WelcomePageController : loadReasons()')
    return mapBody(
      this.http.post<HttpResponse<Reason>>('/reasons', {}, {})
    )
  }

}
