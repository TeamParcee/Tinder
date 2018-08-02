import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the ProfileeditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profileedit',
  templateUrl: 'profileedit.html',
})
export class ProfileeditPage {
  boxwd: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileeditPage');
    this.setheight()
  }

  setheight() {
    var wd = document.getElementById("img_wrapper");
    this.boxwd = wd.offsetWidth;
    wd.style.height = this.boxwd+'px';

    var bottomwd = document.getElementById("bottom_img");
    this.boxwd = bottomwd.offsetWidth;
    bottomwd.style.height = this.boxwd+'px';


  }
}
