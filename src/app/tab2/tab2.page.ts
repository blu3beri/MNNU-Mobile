import { KeyValue } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Credential } from "../models/apiResponse.model";
import { Epd } from "../models/epd.model";
import { ApiHandlerService } from "../services/api-handler.service";
import { NotificationService } from "../services/notification.service";
import { WebsocketHandlerService } from "../services/websocket-handler.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class Tab2Page implements OnInit {
  epd: Epd;
  backupEpd: Epd;
  query: string;

  constructor(
    private wsh: WebsocketHandlerService,
    private apiHandler: ApiHandlerService,
    private ns: NotificationService
  ) {
    this.backupEpd = { ...this.epd };
  }

  ngOnInit() {
    // this.getCredentials();
  }

  async getCredentials() {
    const credentials = await this.apiHandler.getCredentials();
    // DIT MOET ALLE ANDERE NAAST NAW COMBINEREN
    this.epd = credentials[0].attrs;
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  objectCheck(obj: any) {
    return typeof obj === "object" && obj !== null;
  }

  normalCase(value: string): string {
    let first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }

  searchEpd() {
    this.epd = { ...this.backupEpd };
    const queriesEpd = {};
    if (this.query !== "") {
      for (const [key, value] of Object.entries(this.epd)) {
        if (key.includes(this.query)) {
          queriesEpd[key] = value;
        }
      }
      this.epd = { ...queriesEpd };
    } else {
      this.epd = { ...this.backupEpd };
    }
  }

  scan() {}
}
