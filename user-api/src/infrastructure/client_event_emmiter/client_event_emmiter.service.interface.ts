import { Observable } from "rxjs";

export interface ClientEventEmmiterInterface {
  publish(exchange: string, routingKey: string, message: any): Promise<boolean>;
  /*  emit<T>(event: string, data: any): Observable<T>;*/
}
