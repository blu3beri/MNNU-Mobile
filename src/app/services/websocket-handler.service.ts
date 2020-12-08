import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { webSocket } from "rxjs/webSocket";

@Injectable({
  providedIn: "root",
})
export class WebsocketHandlerService {
  public subject = webSocket(environment.websocket.url);

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
