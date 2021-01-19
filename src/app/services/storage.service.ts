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

  async get(key: string) {
    return JSON.parse((await Storage.get({ key })).value);
  }

  async removeItem(key: string) {
    await Storage.remove({ key });
  }

  async keys() {
    const { keys } = await Storage.keys();
    return keys;
  }

  async clear() {
    await Storage.clear();
  }
}
