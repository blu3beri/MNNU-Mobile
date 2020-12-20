// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  websocket: {
    key: "31cc1150-0a7e-42f2-a854-c681802b28cf",
    url: "ws://0.0.0.0:8080/ws",
  },
  // add ngrok generated domain here (or pay like 5$ a month for a subdomain)
  ngrokDomain: "https://1a29b5c73c56.eu.ngrok.io/",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
