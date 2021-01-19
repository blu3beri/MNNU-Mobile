import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { Invitation } from "../models/invite.model";
import { WebsocketHandlerService } from "../services/websocket-handler.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  invite: Invitation;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router, private wsh: WebsocketHandlerService) {
    this.wsh.subject.subscribe((x) => {
      console.log(x);
    });
  }

  scan() {
    this.barcodeScanner
      .scan({ disableSuccessBeep: true, prompt: "Scan de qrcode die u heeft ontvangen" })
      .then((barcodeData) => {
        this.invite = JSON.parse(atob(barcodeData.text));
        // TODO: FIX CHECK
        if (this.invite && this.invite.label) {
          this.wsh.subject.unsubscribe();
          this.router.navigateByUrl("");
        }
      })
      .catch((error) => console.error(error));
  }

  skip() {
    this.router.navigateByUrl("");
  }
}
