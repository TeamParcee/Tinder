import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  Events,
  ToastController,
  LoadingController,
  ViewController
} from 'ionic-angular';
import {Contacts, Contact, ContactField, ContactName} from '@ionic-native/contacts';
import {ImagePicker} from '@ionic-native/image-picker';
import {Crop} from '@ionic-native/crop';
import {Camera} from '@ionic-native/camera';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {NativeGeocoder, NativeGeocoderReverseResult} from '@ionic-native/native-geocoder';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {Media, MediaObject} from '@ionic-native/media';
import {File} from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-attachment',
  templateUrl: 'attachment.html',
  providers: [Contacts, ImagePicker, Crop, Camera, LocationAccuracy, Media, File]
})
export class AttachmentPage {

  photos: Array<string>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private contacts: Contacts,
              private camera: Camera,
              private crop: Crop,
              public cropService: Crop,
              private imagePicker: ImagePicker,
              public events: Events,
              private geolocation: Geolocation,
              public geocoder: NativeGeocoder,
              public toaster: ToastController,
              public locac: LocationAccuracy,
              private media: Media,
              private file: File,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AttachmentPage');
  }

  documentpicker() {
    console.log('File picking..')
  }

  pickcontact() {
    this.contacts.pickContact();
    this.dismiss();
  }

  openImagePicker(imgdata) {
    let options = {
      maximumImagesCount: 4,
    };
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!!');
          this.events.publish('imageurl', this.photos);
        });
      }, (err) => {
        console.log(err)
      });
    this.dismiss();
  }

  reduceImages(selected_pictures: any): any {
    return selected_pictures.reduce((promise: any, item: any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75}).then(cropped_image => this.photos.push(cropped_image));
      });
    }, Promise.resolve());
  }

  takePicture() {
    let options = {
      quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture(options)
      .then((data) => {
        this.photos = new Array<string>();
        this.cropService
          .crop(data, {quality: 75})
          .then((newImage) => {
            this.photos.push(newImage);
            this.events.publish('imageurl', this.photos);
          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
    this.dismiss();
  }

  getContacts(): void {
    this.contacts.pickContact().then((contacts) => {
      console.log(contacts);
      this.events.publish('user contacts', contacts);
    });
    this.dismiss();
  }

  addContact(): void {
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, 'Smith', 'John');
    let number = new ContactField('mobile', '6471234567');
    contact.phoneNumbers = [number];
    contact.save().then(
      () => console.log('Contact saved!', contact),
      (error: any) => console.error('Error saving contact.', error)
    );
    this.dismiss();
  }

  geolocate() {
    let options = {
      enableHighAccuracy: true
    };
    this.locac.canRequest().then((res: boolean) => {
      if (res) {
        this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          let loading = this.loadingCtrl.create({
            // content: 'Fetching your location',
            spinner: 'hide',
            content: `
              <div class="animated_pin">
                <img src="assets/imgs/map_pin.gif" width="160">
              </div>`,
            cssClass: 'customloader'
          });
          loading.present();
          this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {
            this.getcountry(position);
            loading.dismiss();
          }).catch((err) => {
            alert(err);
          })
        }, (error) => {
          alert(error);
        })
      }
    });
    this.dismiss();
  }

  getcountry(pos) {
    this.geocoder.reverseGeocode(pos.coords.latitude, pos.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => {
        // console.log(JSON.stringify(result));
        this.events.publish('user location', result);
      })
      .catch((error: any) => console.log(error));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  recordaudio() {
    this.viewCtrl.dismiss();
    let recordwrapper = document.getElementById('record_audio');
    recordwrapper.style.transform = 'translateY(-4px)'
  }
}
