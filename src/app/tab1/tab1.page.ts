import { KeyValue } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { EditPage } from "../edit/edit.page";
import { ApiHandlerService } from "../services/api-handler.service";
import { naw } from "../models/naw.schema";
import { Naw } from "../models/naw.model";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  naw: Naw;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private apiHandler: ApiHandlerService
  ) {}

  ngOnInit() {
    this.getNawCredential();
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  isObject(val: any): boolean {
    return typeof val === "object";
  }

  async openModal(empty = false) {
    let x = {};
    if (empty) {
      const attributes = [];
      naw.attributes.forEach((attr) => {
        attributes[attr] = "";
      });

      x = this.parseNaw(attributes, false);
    }
    const modal = await this.modalController.create({
      component: EditPage,
      componentProps: { newNaw: empty ? x : this.naw },
    });
    modal.onDidDismiss().then((data) => {
      if (!data.data["dismissed"]) {
        data.data.naw.geboortedatum = new Date(data.data.naw.geboortedatum);
        this.naw = { ...data.data.naw };
      }
    });
    return await modal.present();
  }

  isDate(date: any) {
    return typeof date.getMonth === "function";
  }

  async getNawCredential() {
    const credential = await this.apiHandler.getCredentialByName("naw");
    if (credential && credential.attrs) {
      this.parseNaw(credential.attrs);
    }
  }

  parseNaw(attrs: any, setNaw = true) {
    const newNaw = {};
    const huisarts = {};
    const mantelzorger = {};
    const contactpersoon = {};
    const verzekering = {};
    const adres = {};
    attrs.geboortedatum = new Date(attrs.geboortedatum);

    for (const [key, value] of Object.entries(attrs)) {
      const split = key.split("_");
      if (split.length > 1) {
        if (split[0] === "huisarts") {
          huisarts[split[1]] = value;
        } else if (split[0] === "mantelzorger") {
          mantelzorger[split[1]] = value;
        } else if (split[0] === "contactpersoon") {
          contactpersoon[split[1]] = value;
        } else {
          newNaw[key] = value;
        }
      } else {
        if (key === "polisnummer" || key === "verzekeraar") {
          verzekering[key] = value;
        } else if (
          key === "straat" ||
          key === "toevoeging" ||
          key === "postcode" ||
          key === "huisnummer" ||
          key === "woonplaats" ||
          key === "land" ||
          key === "provincie"
        ) {
          adres[key] = value;
        } else {
          newNaw[key] = value;
        }
      }
    }

    newNaw["adres"] = adres;
    newNaw["verzekering"] = verzekering;
    newNaw["huisarts"] = huisarts;
    newNaw["mantelzorger"] = mantelzorger;
    newNaw["contactpersoon"] = contactpersoon;
    if (setNaw) {
      this.naw = newNaw as Naw;
    } else {
      return newNaw as Naw;
    }
  }

  ghettoFunction() {
    const haha = [];
    const xx = {
      requested_attributes: {},
      requested_predicates: {},
      self_attested_attributes: {},
      trace: false,
    };
    for (let i = 1; i <= 36; i++) {
      const lol = "attribute" + i;
      xx.requested_attributes[lol] = {
        cred_id: "7f241900-aae8-4135-af4a-e8ae7c51d959",
        revealed: true,
      };
    }
    console.log(JSON.stringify(xx));
  }
}
