import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";

const { Storage } = Plugins;

@Injectable({
  providedIn: "root",
})
export class StorageService {
  async set(key: string, value: {}) {
    await Storage.set({
      key,
      value: JSON.stringify(value),
    });
  }

  // JSON "get" example
  async get(key: string) {
    return JSON.parse((await Storage.get({ key })).value);
  }

  async removeItem() {
    await Storage.remove({ key: "name" });
  }

  async keys() {
    const { keys } = await Storage.keys();
    console.log("Got keys: ", keys);
  }

  async clear() {
    await Storage.clear();
  }
}
