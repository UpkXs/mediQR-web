import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Queue} from "../model/Queue";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class QueuePageController {
  constructor(private http: HttpClient) {
  }

  addQueue(queue: Queue): Observable<number> {
    console.log("41d3lYBq :: QueuePageController : addQueue");
    console.log("EhHD46V7 :: QueuePageController : queue : ", queue);
    return this.http.post<number>('http://localhost:8080/addQueue', {queue}, {});
  }
}
