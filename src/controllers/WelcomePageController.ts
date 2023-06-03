import {Injectable} from "@angular/core";
import {Reason} from "../model/Reason";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class WelcomePageController {

  constructor(private http: HttpClient) {
  }

  // loadReasons(): Observable<Reason[]> {  // todo aro iHTAmD89 maybe will be need
  //   console.log('7NyYuSUi :: WelcomePageController : loadReasons()');
  //   return mapBody(
  //     this.http.post<HttpResponse<Reason[]>>('http://localhost:8080/reasons', {}, {})
  //   )
  // }

  loadReasons(): Observable<Reason[]> {
    return this.http.post<Reason[]>('http://localhost:8080/reasons', {}, {});
  }

}
