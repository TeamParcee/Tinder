import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { AuthProvider } from '../../providers/auth/auth';
import { initDomAdapter } from '../../../node_modules/@angular/platform-browser/src/browser';


 declare var window;
@IonicPage()
@Component({
  selector: 'page-phonenumber',
  templateUrl: 'phonenumber.html',
})
export class PhonenumberPage {

  constructor(
    private auth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      this.init()
  }
phoneNumber;
appVerifier;
recaptchaVerifier;
  async otp(){
    let confirmationResult = await this.auth.signInWithPhoneNumber(this.phoneNumber, this.appVerifier );
    console.log(confirmationResult);
    if(confirmationResult){
      this.navCtrl.push('OtpPage', {confirmationResult: confirmationResult});
    } else {
      console.log(confirmationResult);
    }    
  }

  ionViewDidEnter(){
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
init(){
  // window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  //   'size': 'invisible',
  //   'callback': function(response) {
  //     // reCAPTCHA solved, allow signInWithPhoneNumber.
  //     this.appVerifier = response;
  //     console.log(response);
  //   }
  // })
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
}


}