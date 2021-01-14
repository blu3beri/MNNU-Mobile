import { KeyValue } from "@angular/common";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Credential } from "../models/apiResponse.model";
import { Epd } from "../models/epd.model";
import { ApiHandlerService } from "../services/api-handler.service";
import { NotificationService } from "../services/notification.service";
import { WebsocketHandlerService } from "../services/websocket-handler.service";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class Tab2Page implements OnInit {
  epd: Epd;
  backupEpd: Epd;
  query: string;

  constructor(
    private wsh: WebsocketHandlerService,
    private ahs: ApiHandlerService,
    private ns: NotificationService
  ) {
    // this.epd = {
    //   huisarts: "pariatur",
    //   screening: "in reprehenderit eius",
    //   resultaat: "nesciunt",
    //   toestemming_HA: false,
    //   functioneringsproblemen:
    //     "Eveniet voluptates sit ducimus voluptates. Placeat occaecati cupiditate qui voluptas vitae a. Unde dignissimos rerum expedita repudiandae. Placeat molestiae in nemo sit. Aliquam maxime ipsam nemo asperiores.",
    //   duur: "Veritatis ducimus dicta optio.",
    //   medische_gezondheidsdeterminanten:
    //     " \rVeniam qui libero fuga sed voluptatem atque consequatur et. Nobis et esse. Consequatur quaerat enim quaerat dolores molestiae provident eligendi. Aspernatur tempora facere. Unde voluptates iste delectus quia quia quibusdam ex.",
    //   verwachting_client: "et",
    //   plan_voor_volgende_sessie: "dignissimos",
    //   datum_eindevaluatie: "Non dolorum eos.",
    //   doorverwijzing: {
    //     datum: "id rerum quia",
    //     adres: "Vel architecto nam delectus iusto.",
    //     diagnose:
    //       "Ea commodi quo maxime et sit. Et perspiciatis et accusamus velit facilis maiores sequi. Inventore libero aspernatur dolores rem sed ratione sed illum. Quas aut nostrum qui nesciunt. Id id aut quisquam magnam est consequuntur voluptas. Quos quia quibusdam labore quae dolorem ducimus sequi.",
    //     UID: "Ut mollitia ipsam natus molestiae et.",
    //   },
    //   logopedist: {
    //     hulpvraag: "id dolorem minus",
    //     diagnose: "et",
    //     hoofddoel:
    //       "Sunt qui rerum error molestias voluptatibus repellat mollitia corporis voluptas.",
    //   },
    //   ergotherapeut: {
    //     diagnostisch_onderzoek:
    //       " \rVoluptas veritatis neque qui iure sed rem omnis dolores. Ut provident qui deleniti aliquid et et mollitia. Et veniam molestiae ipsam commodi deserunt. Rerum cum qui molestias laborum. Reprehenderit non adipisci sunt voluptatibus laborum illo quia quo. Non est voluptatem velit explicabo nisi cum laboriosam.",
    //     hoofddoel: "quia",
    //   },
    //   fysiotherapeut: {
    //     diagnostisch_onderzoek:
    //       " \rVoluptas veritatis neque qui iure sed rem omnis dolores. Ut provident qui deleniti aliquid et et mollitia. Et veniam molestiae ipsam commodi deserunt. Rerum cum qui molestias laborum. Reprehenderit non adipisci sunt voluptatibus laborum illo quia quo. Non est voluptatem velit explicabo nisi cum laboriosam.",
    //     diagnose: "Uhm nee",
    //   },
    //   persoonlijke_determinanten:
    //     "Saepe id repellat blanditiis. Illum omnis dolor et tempora quos saepe sint eum. Porro quas veniam excepturi autem et dolorem est quasi. Molestiae labore fuga non reprehenderit molestiae rerum sequi. Aut reprehenderit ut omnis.",
    //   toelichting_screening:
    //     "Temporibus voluptatem molestias at officiis. Voluptatem id eum totam id rem. Et odit commodi dolorem est incidunt. In ut eos itaque perspiciatis. Perspiciatis corporis et impedit eos est tempora quia nihil quis.\n" +
    //     " \rVelit dolore quos amet omnis minus quis ea. Et rerum expedita. Et mollitia sed cupiditate est quae. Distinctio perferendis impedit et officiis qui. Iure ea ullam. Quidem est voluptatem voluptatem explicabo autem perferendis numquam eum ut.\n" +
    //     " \rExplicabo aperiam mollitia perferendis voluptatem qui. Fugit omnis et quasi quas est voluptatem nulla qui temporibus. Ducimus voluptas animi consequatur at asperiores. Possimus animi officiis consectetur magnam.",
    //   afwijkende_symptonen: "Quidem et et ad porro aspernatur.",
    //   adres_behandelend_specialist: "id",
    //   aanvraag_voor_nadere_diagnostiek: "nobis",
    //   beleid_verwijzer_tot_nu_toe:
    //     "Ea dolorem non in distinctio. Est officiis nobis quis provident autem maiores voluptatem. Laboriosam saepe reprehenderit quam aut et commodi.",
    //   reden_voor_opname:
    //     "Velit pariatur quis aut natus perspiciatis. Harum ut sequi et voluptatibus voluptatem.",
    //   hulpvraag_van_clientsysteem:
    //     "Omnis qui sed consequatur aut et. Ut cupiditate est id non illum nemo eius. Saepe aspernatur quis tempore corrupti quia. Consequatur quia at voluptates consequuntur facere ut dignissimos officiis quod. Tenetur animi omnis error sequi eum qui est id sapiente. Tenetur est ipsa ut enim iusto consectetur.",
    //   verwachtingen_van_clientsysteem:
    //     "Velit culpa aperiam quo veritatis culpa optio aut. Unde sunt totam. Ullam error quos sit dignissimos.",
    //   medicatie: "Ea minus quisquam non a molestiae odit.",
    //   mening_client_over_gezondheidstoestand:
    //     "Saepe deserunt id quos ut ea fugit.",
    //   werk_en_opleiding:
    //     "Qui earum tenetur libero cupiditate unde cumque aliquid. Occaecati dolore numquam fugiat voluptatem. Et reiciendis praesentium accusamus aliquam non id natus sed saepe.",
    //   persoonlijke_achtergrond:
    //     "Minus qui earum quibusdam voluptatibus debitis rem. Ut voluptas sed quia dicta. Est eaque porro qui voluptatem.",
    //   leefstijl: "minus illo omnis",
    //   fysieke_en_mentale_belastbaarheid:
    //     "Ad doloremque suscipit minima tenetur perferendis ipsum id rerum.",
    //   aanwezige_voorzieningen: "at accusamus accusamus",
    //   verwacht_aantal_sessies:
    //     "Omnis dolor aut eius et nihil eveniet odio quia voluptas. Quis impedit est iure enim nihil ipsa nemo. Unde aut in quia ducimus laborum voluptas.",
    //   gepland_evaluatiemoment: "ab",
    //   bijstelling_diagnose: "Consequuntur eum unde eveniet eius ipsum et.",
    //   bijstelling_behandelplan: "Doloremque placeat ex eveniet aut.",
    //   overleggegevens:
    //     " \rOfficia eveniet eos qui. Voluptas temporibus voluptatem sint. Ipsa id quas omnis ut ipsum expedita nulla. Et culpa magnam tenetur et ad neque.",
    //   tussenresultaat:
    //     "Dolor et dolor explicabo quia asperiores animi distinctio.",
    //   datum_tussenverslag: "nostrum",
    //   afwijking_verwacht_behandelbeloop: "aspernatur",
    //   nazorg_of_afspraken: "non tenetur rerum",
    // };
    this.backupEpd = { ...this.epd };
  }

  ngOnInit() {
    // this.getCredentials();
  }

  getCredentials() {
    // this.ahs.getCredentials().subscribe(
    //   (results: Credential[]) => {
    //     console.log(results);
    //     this.epd = results[0].attrs;
    //   },
    //   (error) => this.ns.notify("Something went wrong. Try again")
    // );
  }

  originalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };

  objectCheck(obj: any) {
    return typeof obj === "object" && obj !== null;
  }

  normalCase(value: string): string {
    let first = value.substr(0, 1).toUpperCase();
    return first + value.substr(1);
  }

  searchEpd() {
    this.epd = { ...this.backupEpd };
    const queriesEpd = {};
    if (this.query !== "") {
      for (const [key, value] of Object.entries(this.epd)) {
        if (key.includes(this.query)) {
          queriesEpd[key] = value;
        }
      }
      this.epd = { ...queriesEpd };
    } else {
      this.epd = { ...this.backupEpd };
    }
  }

  scan() {}
}
