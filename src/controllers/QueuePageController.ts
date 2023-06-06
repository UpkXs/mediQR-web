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

  leaveQueueById(queueId: string): Observable<number> {
    return this.http.post<number>(this.api + '/leave-queue-by-id/queueId', queueId);
  }

  leaveQueueByNumber(queueNumber: number): Observable<number> {
    return this.http.post<number>(this.api + '/leave-queue-by-number/queueNumber', queueNumber);
  }

  loadAllQueue(): Observable<Queue[]> {
    return this.http.post<Queue[]>(this.api + '/load-all-queue', {}, {});
  }

  setIsYourTurn(queueNumber: number): Observable<number> {
    return this.http.post<number>(this.api + '/set-is-your-turn/queueNumber', queueNumber);
  }

  removeQueuesByNumber(queueNumbers: number[]): Observable<number> {
    return this.http.post<number>(this.api + '/remove-queues-by-number/queueNumbers', queueNumbers);
  }
}
