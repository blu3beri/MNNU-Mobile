import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1Page } from "./tab1.page";
import { MatExpansionModule } from "@angular/material/expansion";

import { Tab1PageRoutingModule } from "./tab1-routing.module";
import { PipeModule } from "../pipes/pipes.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab1PageRoutingModule, MatExpansionModule, PipeModule.forRoot()],
  declarations: [Tab1Page],
})
export class Tab1PageModule {}
