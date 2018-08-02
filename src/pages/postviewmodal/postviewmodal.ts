import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,PopoverController,ModalController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-postviewmodal',
  templateUrl: 'postviewmodal.html',
})
export class PostviewmodalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,public popoverCtrl: PopoverController,public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostviewmodalPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  postpopover(myEvent) {
    let popover = this.popoverCtrl.create('PostpopoverPage');
    popover.present({
      ev: myEvent
    });
  }

  changetextarea() {
    // get elements
    var element   = document.getElementById('messageInputBox');
    var textarea  = element.getElementsByTagName('textarea')[0];

    // set default style for textarea
    textarea.style.minHeight  = '50px';
    textarea.style.height     = '0';

    // limit size to 96 pixels (6 lines of text)
    var scroll_height = textarea.scrollHeight;
    if(scroll_height > 160)
      scroll_height = 160;

    // apply new style
    element.style.height      = scroll_height + "px";
    textarea.style.minHeight  = scroll_height + "px";
    textarea.style.height     = scroll_height + "px";
  }

  replycomment(){
    let modal = this.modalCtrl.create('ReplycommentPage');
    modal.present();
  }
}
