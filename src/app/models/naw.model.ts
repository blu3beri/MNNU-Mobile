export interface Naw {
  naam: string;
  voorletters: string;
  achternaam: string;
  geslacht: Geslacht;
  geboortedatum: string | Date;
  bsn: number;
  geldigheid_id: string;
  burgerlijke_staat: BurgerlijkeStaat;
  telefoonummer: string;
  email: string;
  geboorteland: string;
  adres: {
    huisnummer: string;
    straat: string;
    woonplaats: string;
    postocde: string;
    toevoeging: string;
    land: string;
    provincie: string;
  };
  verzekering: {
    verzekeraar: string;
    polisnummer: string;
  };
  huisarts: {
    UID: string;
    email: string;
    naam: string;
    telefoonnummer: string;
    adres: {
      toevoeging: string;
      huisnummer: string;
      straat: string;
    };
  };
  mantelzorger: {
    achternaam: string;
    email: string;
    telefoonnummer: string;
    tussenvoegsel: string;
    naam: string;
  };
  contactpersoon: {
    naam: string;
    achternaam: string;
    email: string;
    telefoonnummer: string;
    tussenvoegsel: string;
  };
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
