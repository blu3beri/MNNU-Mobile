import { KeyValue } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ɵNgNoValidate } from "@angular/forms";
import { Epd } from "../models/epd.model";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  epd: Epd;

  constructor() {
    this.epd = {
      hulpvraag: "Hoe kan ik het snelst weer lopen?",
      huisarts: "Dr. Jan bakker",
      logoPrimary: { hulpvraag: "Hoe doe ik mn logo dingen", meetinstrument: "triangel" },
      ergoPrimary: { hulpvraag: "Hoe doe ik mn ergo dingen", meetinstrument: "triangel" },
      fysioPrimary: { hulpvraag: "Hoe doe ik mn fysio dingen", meetinstrument: "triangel" },
    };
  }

  ngOnInit() {}

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  objectCheck(obj: any) {
    return typeof obj === "object" && obj !== null;
  }
}
