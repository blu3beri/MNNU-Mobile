import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { OnboardingPage } from "./onboarding/onboarding.page";
import { Router } from "@angular/router";
import { StorageService } from "./services/storage.service";
import { Plugins, StatusBarStyle } from "@capacitor/core";

const { StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  rootPage: any = OnboardingPage;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private storage: StorageService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.setStatusBar();
      this.pushToAppOnboarding();
    });
  }

  async pushToAppOnboarding() {
    this.storage.get("didOnboarding").then((result) => {
      if (result && result.didOnboarding) {
        // GOTO LOGIN IF U NEED PINCODE OR NO QRCODE IS SCANNED (STORE IN STORAGE IF IT HAS BEEN SCANNED)
        // this.router.navigateByUrl("login");
        this.router.navigateByUrl("tabs/tab2");
      } else {
        this.router.navigateByUrl("onboarding");
      }
    });
  }

  setStatusBar() {
    StatusBar.setBackgroundColor({ color: "white" });
    StatusBar.setStyle({ style: StatusBarStyle.Light });
  }
}
