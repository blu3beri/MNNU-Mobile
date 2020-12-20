import { Component } from "@angular/core";
import { ResInvite } from "../models/wsResponse.model";
import { WebsocketHandlerService } from "../services/websocket-handler.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  invites: ResInvite[] = [];

  constructor(private wsh: WebsocketHandlerService) {
    this.wsh.subject.subscribe((invite) => {
      const body = invite.body as ResInvite;
      if (invite.topic === "connections") {
        if (!this.invites.find((inv) => inv.connection_id === body.connection_id)) {
          this.invites.push(body);
        }
      }
    });
  }
}
