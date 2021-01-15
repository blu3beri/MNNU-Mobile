import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { AlertController, ModalController } from "@ionic/angular";
import { environment } from "src/environments/environment";
import { ConnectionsPage } from "../connections/connections.page";
import { ApiHandlerService } from "../services/api-handler.service";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  activeConnections = [];
  invite: any;
  proofs: any[];

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private apiHandler: ApiHandlerService,
    private barcodeScanner: BarcodeScanner
  ) {}

  ngOnInit() {
    this.getConnections();
    this.getProofRequests();
  }

  async getConnections() {
    const connections = await this.apiHandler.getConnections();
    this.activeConnections = connections.filter(
      (connection: any) =>
        connection.state === "active" &&
        connection.their_label !== environment.userName
    );
  }

  showConnection(connection) {}

  async getProofRequests() {
    // this.proofs = await this.apiHandler.getPresentProofRecordsByState(
    //   "request_received"
    // );
    this.proofs = await this.apiHandler.getPresentProofRecords();
    if (this.proofs && this.proofs.length > 0) {
      this.connectProofs();
    }
  }

  connectProofs() {
    this.activeConnections.forEach((connection) => {
      connection.proof =
        this.proofs.find(
          (proof) => proof.connection_id === connection.connection_id
        ) || undefined;
    });
    console.log(this.activeConnections);
  }

  async removeConnection(connection) {
    console.log(connection);

    const alert = await this.alertController.create({
      header: "Let op!",
      message:
        "Als u de connectie verwijderd heeft de dokter geen toegang meer tot uw gegevens. Weet u zeker dat u dit wil doen? (De connectie kan later weer gemaakt worden)",
      buttons: [
        {
          text: "CANCEL",
          role: "cancel",
        },
        {
          text: "OK",
          handler: () => {
            this.apiHandler
              .deleteConnection(connection.connection_id)
              .then((_) => {
                this.activeConnections.splice(
                  this.activeConnections.indexOf(connection),
                  1
                );
              });
          },
        },
      ],
    });
    await alert.present();
  }

  async help() {
    const alert = await this.alertController.create({
      header: "Help",
      message:
        "Hier ziet u al uw actieve connecties. Als u een dokter naar links veegt, kunt u de connectie verwijderen.",
      buttons: ["OK"],
    });

    await alert.present();
  }

  async openModal(connection: any) {
    const modal = await this.modalController.create({
      component: ConnectionsPage,
      componentProps: { connection },
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    return await modal.present();
  }

  scan() {
    this.barcodeScanner
      .scan({
        disableSuccessBeep: true,
        prompt: "Scan de qrcode die u heeft ontvangen",
      })
      .then(async (barcodeData) => {
        const invite = JSON.parse(atob(barcodeData.text));
        invite.label = invite.label.replace("_", " ");

        const alert = await this.alertController.create({
          header: "Let op!",
          message: `${invite.label} wilt een connectie met u beginnen. Gaat u hiermee akkoord?`,
          buttons: [
            {
              text: "CANCEL",
              role: "cancel",
            },
            {
              text: "OK",
              handler: () => {
                this.apiHandler
                  .postReceiveInvitation(invite, "true", invite.label)
                  .then(async () => {
                    await new Promise((r) => setTimeout(r, 2000));
                    this.getConnections();
                  })
                  .catch((e) => console.error(e));
              },
            },
          ],
        });
        await alert.present();
      })
      .catch((error) => console.error(error));
  }
}
