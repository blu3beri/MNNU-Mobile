import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Invite } from '../models/invite.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage {
  invite: Invite;

  constructor(private barcodeScanner: BarcodeScanner, private router: Router) {}

  scan() {
    this.barcodeScanner.scan({disableSuccessBeep: true, prompt: "Scan de qrcode die u heeft ontvangen"}).then(barcodeData => {
      this.invite = JSON.parse(atob(barcodeData.text));
      if(this.invite && this.invite.label) {
        this.router.navigateByUrl('');
      }
    }).catch(error => console.error(error)
    )
  }

  skip() {
    this.router.navigateByUrl('');
  }
}
