import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

// declare var OTPAutoVerification:any;

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  constructor(
    private auth: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.confirmationResult = this.navParams.get('confirmationResult');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  next(el) {
    el.setFocus();
  }
  confirmationResult;
  numberverify = {
    otpOne: '',
    otpTwo: '',
    otpThree: '',
    otpFour: '',

  };

  logForm() {
    console.log(this.numberverify);
    this.smsread();
  }

  smsread(){
  /*  var options = {
      delimiter : "code is",
      length : 4,
      origin : "650 555-6789"
    };

    var success = function (otp) {
      console.log("GOT OTP", otp);
      OTPAutoVerification.stopOTPListener();
    }

    var failure = function () {
      OTPAutoVerification.stopOTPListener();
      console.log("Problem in listening OTP");
    }

    OTPAutoVerification.startOTPListener(options, success, failure);*/
    // this.auth.confirmCode()
    this.navCtrl.push('ProfilesetupPage')
  }
}
