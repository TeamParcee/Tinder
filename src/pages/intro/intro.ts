import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
    selector: 'page-intro',
    templateUrl: 'intro.html',
    providers: [LocationAccuracy]
})
export class IntroPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
                private geolocation: Geolocation,
                public geocoder: NativeGeocoder,
                public locac: LocationAccuracy,) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad IntroPage');
        this.geolocate();
    }

    expend() {
        document.getElementById('top').classList.add('hide');
        document.getElementById('bottom').classList.add('expend');
    }

    minimize_btn() {
        document.getElementById('top').classList.remove('hide');
        document.getElementById('bottom').classList.remove('expend');
    }

    phone() {
        this.navCtrl.push('PhonenumberPage')
    }

    match() {
        this.navCtrl.push('TabsPage')
    }

    geolocate() {
        let options = {
            enableHighAccuracy: true
        };
        this.locac.canRequest().then((res: boolean) => {
            if (res) {
                this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
                    this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
                    }).catch((err) => {
                        alert(err);
                    })
                }, (error) => {
                    alert(error);
                })
            }
        });
    }
}
