import { KeyValue } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Naw } from "../models/naw.model";
import { naw } from "../models/naw.schema";
import { ApiHandlerService } from "../services/api-handler.service";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"],
})
export class EditPage {
  @Input() newNaw: Naw;
  loading = false;
  attributes: { name: string; value: any }[];

  constructor(
    private modalCtrl: ModalController,
    private notifications: NotificationService,
    private apiHandler: ApiHandlerService
  ) {}

  isObject(val: any): boolean {
    return typeof val === "object";
  }

  isDate(date: any) {
    return typeof date.getMonth === "function";
  }

  dismiss() {
    this.modalCtrl.dismiss({ dismissed: true });
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  change(key: string, e: any, isInput = false, isSub = false, subValue = "") {
    if (!isSub) {
      if (e.keyCode && e.keyCode === 13 && isInput) {
        this.newNaw[key] = e.target.value;
      } else if (!isInput) {
        this.newNaw[key] = e.target.value;
      }
    } else if (e.keyCode && e.keyCode === 13 && isInput) {
      this.newNaw[subValue][key] = e.target.value;
    }
  }

  save() {
    this.parseNawBack();
    this.createCredential();
  }

  parseNawBack() {
    const copyNaw = [...naw.attributes];
    this.attributes = [];
    for (const [key, value] of Object.entries(this.newNaw)) {
      const foundItem = copyNaw.find((item) => item === key);
      if (foundItem) {
        this.attributes.push({ name: key, value });
      } else if (key === "adres") {
        for (const [akey, avalue] of Object.entries(value)) {
          this.attributes.push({ name: akey, value: avalue });
        }
      } else if (key === "verzekering") {
        for (const [vkey, vvalue] of Object.entries(value)) {
          this.attributes.push({ name: vkey, value: vvalue });
        }
      } else if (key === "huisarts") {
        for (const [hkey, hvalue] of Object.entries(value)) {
          this.attributes.push({ name: "huisarts_" + hkey, value: hvalue });
        }
      } else if (key === "mantelzorger") {
        for (const [mkey, mvalue] of Object.entries(value)) {
          this.attributes.push({ name: "mantelzorger_" + mkey, value: mvalue });
        }
      } else if (key === "contactpersoon") {
        for (const [ckey, cvalue] of Object.entries(value)) {
          this.attributes.push({ name: "contactpersoon_" + ckey, value: cvalue });
        }
      }
    }
  }

  createCredential() {
    this.loading = true;
    this.createSelfConnenction();
  }

  async createSelfConnenction() {
    const createInvitation = await this.apiHandler.postCreateInvitation(
      "SELF_CONNECTION_CREATE",
      "true",
      "false",
      "false"
    );
    const receiveInvitation = await this.apiHandler.postReceiveInvitation(
      createInvitation.invitation,
      "true",
      "SELF_CONNECTION_RECEIVE"
    );
    let counter = 0;
    let state = "request";
    while (state !== "active" && counter <= 10) {
      const connection = await this.apiHandler.getConnectionById(receiveInvitation.connection_id);
      state = connection.state;
      console.log("failed!");
      counter++;
      await new Promise((r) => setTimeout(r, 5000));
    }
    if (counter > 10) {
      console.error("beeeg error");
    } else {
      console.log("passed!");
      this.createSchemaAndDefinition(receiveInvitation);
    }
  }

  async createSchemaAndDefinition(receiveInvitation: any) {
    const connection = await this.apiHandler.getConnectionById(receiveInvitation.connection_id);
    console.log(`connection id: ${connection.connection_id} is in state: ${connection.state}`);

    const schema = await this.apiHandler.postSchema(naw);
    console.log(`schema id: ${schema.schema_id}`);

    const credentialDefinition = await this.apiHandler.postCredentialDefinition(schema);
    console.log(`credential definition id: ${credentialDefinition.credential_definition_id}`);

    await new Promise((r) => setTimeout(r, 5000));

    this.sendCredential(
      credentialDefinition.credential_definition_id,
      schema,
      connection.connection_id,
      this.attributes
    );
  }

  async sendCredential(credDefId: string, schema: any, connectionId: string, attributes: {}[]) {
    console.log(attributes);
    this.apiHandler.postCredential(credDefId, schema, connectionId, attributes, "yay").then(() => {
      this.loading = false;
      this.modalCtrl.dismiss({ naw: this.newNaw });
      this.notifications.notify("De veranderingen zijn doorgevoerd!");
    });
  }
}
