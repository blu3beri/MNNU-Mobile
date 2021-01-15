import { KeyValue } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { ApiHandlerService } from "../services/api-handler.service";

@Component({
  selector: "app-connections",
  templateUrl: "./connections.page.html",
  styleUrls: ["./connections.page.scss"],
})
export class ConnectionsPage implements OnInit {
  @Input() connection: any;

  constructor(
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private apiHandler: ApiHandlerService
  ) {}

  ngOnInit() {
    console.log(this.connection);
  }

  dismiss() {
    this.modalCtrl.dismiss({ dismissed: true });
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  async help() {
    const alert = await this.alertController.create({
      header: `${this.connection.their_label}`,
      subHeader: "Reden",
      message: `${
        this.connection.proof.presentation_request.name.split(":")[1]
      }`,
      buttons: ["OK"],
    });

    await alert.present();
  }

  async acceptProofRequest() {
    const alert = await this.alertController.create({
      header: `Versturen van ${
        this.connection.proof.presentation_request.name.split(":")[0]
      }`,
      message: "Weet u zeker dat u de gevraagde data wil delen met de dokter?",
      buttons: [
        {
          text: "CANCEL",
          role: "cancel",
        },
        {
          text: "OK",
          handler: () => {
            this.sendProof();
          },
        },
      ],
    });

    await alert.present();
  }

  async sendProof() {
    const requestedAttributes = {};
    const credential = await this.apiHandler.getCredentialByName(
      this.connection.proof.presentation_request.name
        .split(":")[0]
        .toLowerCase()
    );
    const cred_id = credential.referent;
    for (const [key, value] of Object.entries(
      this.connection.proof.presentation_request.requested_attributes
    )) {
      const prop = {
        cred_id,
        revealed: true,
      };
      requestedAttributes[key] = prop;
    }
    await this.apiHandler.postPresentProofPresentation(
      this.connection.proof.presentation_exchange_id,
      requestedAttributes
    );
  }

  async denyProofRequest() {
    const alert = await this.alertController.create({
      header: `Weigeren van ${
        this.connection.proof.presentation_request.name.split(":")[0]
      }`,
      message:
        "Weet u zeker dat u de gevraagde data NIET wil delen met de dokter?",
      buttons: [
        {
          text: "CANCEL",
          role: "cancel",
        },
        {
          text: "OK",
          handler: () => {
            this.denyProof();
          },
        },
      ],
    });

    await alert.present();
  }

  async denyProof() {
    await this.apiHandler.deletePresentationProof(
      this.connection.proof.presentation_exchange_id
    );
  }
}
