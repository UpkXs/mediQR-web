import {Injectable} from "@angular/core";
import {Reason} from "../model/Reason";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {mapBody} from "../utils/RzJsUtil";

@Injectable({providedIn: 'root'})
export class WelcomePageController {

  reasons: Reason[] = [ // todo aro v9W2Q8Z7cz remove after server included
    {
      id: 'ot6hO0w25x',
      name: 'Doctor\'s appointment'
    },
    {
      id: 'wzHuT2M7gs',
      name: 'Analyzes'
    },
    {
      id: 'a72b5SkBpI',
      name: 'Ultrasound'
    },
    {
      id: 's7xhlBna8p',
      name: 'X-Ray'
    },
    {
      id: 'K2qoGiz255',
      name: 'Certificate of illness'
    },
    {
      id: '5K9zQ70iw7',
      name: 'Sick leave'
    },
  ]

  constructor(private http: HttpClient) {
  }

  // loadReasons(): Observable<Reason[]> {  // todo aro bIEuyKM8Db change after server included
  //   console.log('Ocq4Fs2s6Q :: WelcomePageController : loadReasons()')
  //   return mapBody(
  //     this.http.post<HttpResponse<Reason[]>>('/reasons', {}, {})
  //   )
  // }

  loadReasons() { // todo aro BdMKqaXD02 change after server included
    console.log('f3yxO409Zt :: WelcomePageController : loadReasons()');
    return this.reasons;
  }

}
