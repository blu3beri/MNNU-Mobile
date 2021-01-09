import { KeyValue } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BurgerlijkeStaat, Geslacht } from '../models/naw.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage {
  @Input() naam: string;
  @Input() voorletters: string;
  @Input() achternaam: string;
  @Input() geslacht: Geslacht;
  @Input() geboortedatum: string | Date;
  @Input() burgerservicenummer: number;
  @Input() geldigheid_identiteitskaart: string;
  @Input() burgerlijke_staat: BurgerlijkeStaat;
  @Input() telefoonummer: string;

  constructor(private modalCtrl: ModalController, private notifications: NotificationService) { }

  dismiss() {
    this.modalCtrl.dismiss({dismissed: true});
    this.notifications.notify('No changes have been made');
  }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  };

  save() {
    this.modalCtrl.dismiss({
      naam: this.naam,
      voorletters: this.voorletters,
      achternaam: this.achternaam,
      geslacht: this.geslacht,
      geboortedatum: this.geboortedatum,
      burgerservicenummer: this.burgerservicenummer,
      geldigheid_identiteitskaart: this.geldigheid_identiteitskaart,
      burgerlijke_staat: this.burgerlijke_staat,
      telefoonummer: this.telefoonummer
    });
    this.notifications.notify('Changes have been saved!');
  }
}