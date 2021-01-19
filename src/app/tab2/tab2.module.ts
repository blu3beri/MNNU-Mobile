import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab2Page } from "./tab2.page";
import { MatExpansionModule } from "@angular/material/expansion";

import { Tab2PageRoutingModule } from "./tab2-routing.module";
import { PipeModule } from "../pipes/pipes.module";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab2PageRoutingModule, MatExpansionModule, PipeModule.forRoot()],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
