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

// import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { environment } from "src/environments/environment";
// const config: SocketIoConfig = { url: environment.websocket.url, options: {} };

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
    // SocketIoModule.forRoot(config),
  ],
  providers: [StatusBar, SplashScreen, BarcodeScanner, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
