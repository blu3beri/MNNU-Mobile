export interface Naw {
  naam: string;
  voorletters: string;
  achternaam: string;
  geslacht: Geslacht;
  geboortedatum: string | Date;
  burgerservicenummer: number;
  geldigheid_identiteitskaart: boolean;
  burgerlijke_staat: BurgerlijkeStaat;
  telefoonummer: string;
}

export enum Geslacht {
  man = "man",
  vrouw = "vrouw",
  extra = "extra",
}

export enum BurgerlijkeStaat {
  ongehuwd = "ongehuwd",
  samenwonend = "samenwonend",
  wettelijkesamenwoning = "wettelijkesamenwoning",
  gehuwd = "gehuwd",
  gescheiden = "gescheiden",
  weduwstaat = "weduwstaat",
}
