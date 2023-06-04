import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Queue} from "../model/Queue";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class QueuePageController {

  api: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  addQueue(queue: Queue): Observable<number> {
    return this.http.post<number>(this.api + '/addQueue/queue', queue);
  }

  loadQueueCount(): Observable<number> {
    return this.http.post<number>(this.api + '/load-queue-count', {}, {});
  }

  loadQueueCountWithoutMe(queueId: string): Observable<number> {
    return this.http.post<number>(this.api + '/load-queue-count-without-me/queueId', queueId);
  }
}
