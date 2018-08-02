import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pdfview',
  templateUrl: 'pdfview.html',
})
export class PdfviewPage {
  displayData: any = {};
  zoom: any = 1.5;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    // document.querySelector('pdf-viewer').zoom
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdfviewPage');
    this.displayData = this.navParams.get('displayData');
  }

  onClose(): void {
    this.viewCtrl.dismiss();
  }

  pdfzoom() {
    this.zoom = this.zoom + 0.2;
  }

  pdfzoomout() {
    if (this.zoom >1.5) {
      this.zoom = this.zoom - 0.2;
    }
  }

}
