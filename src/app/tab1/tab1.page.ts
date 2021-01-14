import { KeyValue } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { EditPage } from "../edit/edit.page";
import { ApiHandlerService } from "../services/api-handler.service";
import { naw } from "../models/naw.schema";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  naw: any;

  constructor(private router: Router, private modalController: ModalController, private apiHandler: ApiHandlerService) {
    this.createSelfConnenction();
    this.getNawCredential();
  }

  async openModal() {
    // if (this.naw.geboortedatum) {
    //   this.naw.geboortedatum = this.naw.geboortedatum.toISOString();
    // }
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: this.naw,
    });
    modal.onDidDismiss().then((data) => {
      if (!data.data["dismissed"]) {
        // TODO: UPDATE CHAIN
        data.data.geboortedatum = new Date(data.data.geboortedatum);
        this.naw = data.data;
      }
    });
    return await modal.present();
  }

  isDate(date: any) {
    return typeof date.getMonth === "function";
  }

  // DEMO

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
    await new Promise((r) => setTimeout(r, 5000));
    this.createSchemaAndDefinition(receiveInvitation);
  }

  async createSchemaAndDefinition(receiveInvitation: any) {
    const connection = await this.apiHandler.getConnectionById(receiveInvitation.connection_id);
    console.log(`connection id: ${connection.connection_id} is in state: ${connection.state}`);

    const schema = await this.apiHandler.postSchema(naw);
    console.log(`schema id: ${schema.schema_id}`);

    const credentialDefinition = await this.apiHandler.postCredentialDefinition(schema);
    console.log(`credential definition id: ${credentialDefinition.credential_definition_id}`);

    await new Promise((r) => setTimeout(r, 5000));
    const attributes = [];

    naw.attributes.forEach((attribute, index) => {
      attributes.push({ name: attribute, value: index.toString() });
    });

    this.sendCredential(credentialDefinition.credential_definition_id, schema, connection.connection_id, attributes);
  }

  async sendCredential(credDefId, schema, connectionId, attributes) {
    await this.apiHandler.postCredential(credDefId, schema, connectionId, attributes, "yay");
    this.getNawCredential();
  }

  async getNawCredential() {
    const credential = await this.apiHandler.getCredentialByName("naw");
    if (credential && credential.attrs) {
      this.naw = credential.attrs;
    }
  }
}
