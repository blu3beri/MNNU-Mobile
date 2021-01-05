import { KeyValue } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ModalController } from '@ionic/angular';
import { EditPage } from "../edit/edit.page";
import { BurgerlijkeStaat, Geslacht, Naw } from "../models/naw.model";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  naw: Naw;

  constructor(private router: Router, private modalController: ModalController) {
    this.naw = {
      naam: "Jan",
      voorletters: "J",
      achternaam: "De Bakker",
      geslacht: Geslacht.man,
      geboortedatum: new Date(),
      burgerservicenummer: 12345678,
      geldigheid_identiteitskaart: "ja",
      burgerlijke_staat: BurgerlijkeStaat.gehuwd,
      telefoonummer: "+31 6 12 34 56 78",
    };
  }

  async openModal() {
    this.naw.geboortedatum = this.naw.geboortedatum.toISOString();
    const modal = await this.modalController.create({component: EditPage, componentProps: this.naw});
    modal.onDidDismiss().then(data => {
      if(!data.data['dismissed']) {
        // TODO: UPDATE CHAIN
        data.data.geboortedatum = new Date(data.data.geboortedatum);
        this.naw = data.data;
      }
    }) 
    return await modal.present();
   }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  isDate(date: any) {
    return typeof date.getMonth === 'function';
  }
}
