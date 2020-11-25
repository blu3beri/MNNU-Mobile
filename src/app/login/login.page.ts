import { Component, OnInit } from "@angular/core";
import { Plugins, StatusBarStyle } from "@capacitor/core";

const { StatusBar } = Plugins;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
