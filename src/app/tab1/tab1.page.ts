import { KeyValue } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { BurgerlijkeStaat, Geslacht, Naw } from "../models/naw.model";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  naw: Naw;
  constructor(private router: Router) {
    this.naw = {
      naam: "Jan",
      voorletters: "J",
      achternaam: "De Bakker",
      geslacht: Geslacht.man,
      geboortedatum: "01-01-1968",
      burgerservicenummer: 12345678,
      geldigheidIdentiteitskaart: true,
      burgerlijkeStaat: BurgerlijkeStaat.gehuwd,
      telefoonummer: "+31 6 12 34 56 78",
    };
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };
}
