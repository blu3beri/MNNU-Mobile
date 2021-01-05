import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";

import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PipeModule } from "./pipes/pipes.module";
import { EditPageModule } from "./edit/edit.module";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PipeModule.forRoot(),
    EditPageModule
  ],
  providers: [StatusBar, SplashScreen, BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
