import { Observable } from "rxjs";

export interface ClientEventEmmiterInterface {
  emit<T>(event: string, data: any): Observable<T>;
}
