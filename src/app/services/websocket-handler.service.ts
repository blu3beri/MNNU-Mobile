import { environment } from "src/environments/environment";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { Injectable } from "@angular/core";
import { WsResponse } from "../models/wsResponse.model";

@Injectable({
  providedIn: "root",
})
export class WebsocketHandlerService {
  public subject: WebSocketSubject<any> = webSocket(environment.websocket.url);

  constructor() {
    this.handshake();
  }

  handshake() {
    this.subject.next({
      fastForward: true,
      auth: environment.websocket.key,
    });
  }
}
