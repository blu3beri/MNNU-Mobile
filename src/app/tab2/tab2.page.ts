import { Component, OnInit } from "@angular/core";

import { Plugins, StatusBarStyle } from "@capacitor/core";

const { StatusBar } = Plugins;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  isStatusBarLight = true;

  changeStatusBar() {
    StatusBar.setStyle({
      style: StatusBarStyle.Light,
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // Display content under transparent status bar (Android only)
    StatusBar.setOverlaysWebView({
      overlay: true,
    });
  }

  hideStatusBar() {
    StatusBar.hide();
  }

  showStatusBar() {
    StatusBar.show();
  }

  ngOnInit() {
    this.changeStatusBar();
  }
}
