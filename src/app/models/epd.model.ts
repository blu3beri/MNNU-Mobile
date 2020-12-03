export interface Epd {
  hulpvraag: string;
  huisarts: string;
  logoPrimary?: LogoPrimary;
  ergoPrimary?: ErgoPrimary;
  fysioPrimary?: FysioPrimary;
}

export interface LogoPrimary {
  hulpvraag: string;
  meetinstrument: string;
}

export interface ErgoPrimary {
  hulpvraag: string;
  meetinstrument: string;
}

export interface FysioPrimary {
  hulpvraag: string;
  meetinstrument: string;
}
