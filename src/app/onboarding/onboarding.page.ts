import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "../services/storage.service";

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.page.html",
  styleUrls: ["./onboarding.page.scss"],
})
export class OnboardingPage {
  constructor(private storage: StorageService, private router: Router) {}

  ionViewDidEnter() {
    this.storage.get("didOnboarding").then((result) => {
      if (result.didOnboarding) {
        this.router.navigateByUrl("tabs/tab1");
      }
    });
  }

  updateOnboarding() {
    this.storage.set("didOnboarding", { didOnboarding: true }).then(() => {
      this.router.navigateByUrl("tabs/tab1");
    });
  }
}
