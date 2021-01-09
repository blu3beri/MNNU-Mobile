import { Component, OnInit } from "@angular/core";
import { AlertController, IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  connections = [
    // {
    //   state: "active",
    //   connection_id: "121212",
    //   their_label: "Dr. Roy",
    //   updated_at: new Date(),
    // },
    // {
    //   state: "active",
    //   connection_id: "121552",
    //   their_label: "Dr. Tyler",
    //   updated_at: new Date(),
    // },
    // {
    //   state: "inactive",
    //   connection_id: "12412",
    //   their_label: "Dr. Karel",
    //   updated_at: new Date(),
    // },
    // {
    //   state: "active",
    //   connection_id: "121345212",
    //   their_label: "Dr. Berend",
    //   updated_at: new Date(),
    // },
  ];

  constructor(private alertController: AlertController) {}

  ngOnInit() {}

  showConnection(connection) {}

  async removeConnection(connection) {
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
            this.connections.splice(this.connections.indexOf(connection), 1);
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
        "Hier ziet u al uw connecties. Als u een dokter naar links veegt, kunt u de connectie verwijderen.",
      buttons: ["OK"],
    });

    await alert.present();
  }
}
