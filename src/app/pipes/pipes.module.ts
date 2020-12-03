import { NgModule } from "@angular/core";
import { CapitalizePipe } from "./capitalize.pipe";

@NgModule({
  imports: [],
  declarations: [CapitalizePipe],
  exports: [CapitalizePipe],
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: [],
    };
  }
}
