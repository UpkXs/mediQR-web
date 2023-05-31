import {map, Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";

export const mapBody: <T>(observable: Observable<HttpResponse<T>>) => Observable<T>
  = <T>(observable: Observable<HttpResponse<T>>) => observable.pipe(map(x => x.body as T));
