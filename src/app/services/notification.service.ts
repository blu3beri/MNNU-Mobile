import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastController: ToastController) { }

  async notify(message: string, duration = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
      cssClass: 'toast-wrapper'
    });
    toast.present();
  }
}
