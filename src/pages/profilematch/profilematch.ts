import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ProfilematchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profilematch',
  templateUrl: 'profilematch.html',
})
export class ProfilematchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilematchPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  chat(){
    this.viewCtrl.dismiss();
    this.navCtrl.push('MessagePage');
  }
}
