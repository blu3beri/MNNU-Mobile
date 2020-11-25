import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { Plugins } from "@capacitor/core";
import { Colors } from "src/app/constants/colors";

const { StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private platform: Platform, private splashScreen: SplashScreen) {
    this.initializeApp();
    this.setStatusBar();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
    });
  }

  setStatusBar() {
    StatusBar.setBackgroundColor({ color: Colors.backgroundColor });
  }
}
