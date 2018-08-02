import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers:[AppRate]
})
export class SettingsPage {
  distance: number = 20;
  age: any = { lower: 18, upper: 28 };
  distancetype: string = "km";

  constructor(public navCtrl: NavController, public navParams: NavParams,private appRate: AppRate,public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
  }

  rating(){
    this.appRate.preferences.storeAppURL = {
      ios: '<app_id>',
      android: 'market://details?id=<package_name>',
      windows: 'ms-windows-store://review/?ProductId=<store_id>'
    };

    this.appRate.promptForRating(true);
  }

  delaccount() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Account?',
      message: 'If you delete your account then your messages, friends, post everything will be erased.',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Agree clicked');
          } 
        }
      ],
      cssClass: 'modified_alert'
    });
    confirm.present();
  }
}
