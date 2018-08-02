import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams,App} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cards: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http,public appCtrl: App) {
  }

  ionViewDidLoad() {
    this.http.get('https://randomuser.me/api/?gender=female?nat=us')
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          this.cards.push(val);
        }
      })
  }

  settings() {
    this.appCtrl.getRootNav().push('SettingsPage');
  }

  profileedit() {
    this.appCtrl.getRootNav().push('ProfileeditPage');
  }
}
