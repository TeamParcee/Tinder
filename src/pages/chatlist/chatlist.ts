import {Component} from '@angular/core';
import {App, Events, IonicPage, LoadingController, NavController, NavParams, ViewController,AlertController,ModalController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {Camera} from "@ionic-native/camera";
import {ImagePicker} from "@ionic-native/image-picker";
import {Crop} from "@ionic-native/crop";


@IonicPage()
@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {
  cards: any = [];
  today = Date.now();
  user: string = "msgs";
  faceImage: any = [];
  postimg: any;
  x: any;
  photos: any = [];
  photolength: any;
  posttext: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private http: Http,
              public appCtrl: App,
              public events: Events,
              private camera: Camera,
              private crop: Crop,
              public cropService: Crop,
              private imagePicker: ImagePicker,
              public loadingCtrl: LoadingController,
              public viewCtrl: ViewController,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController) {
  }


  ionViewDidLoad() {
    this.api();
    this.getphoto();
  }

  api() {
    this.http.get('https://randomuser.me/api/?results=10')
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          this.cards.push(val);
        }
      })

  }

  message() {
    this.appCtrl.getRootNav().push('MessagePage');
  }

  getphoto() {
    let base = this;
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=beautiful nature&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        base.postimg = x.results;
      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })
  }

  openImagePicker(imgdata) {
    let options = {
      maximumImagesCount: 4,
    };
    this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
      .then((results) => {
        let prompt = this.alertCtrl.create({
          title: 'Post text',
          message: "Write something about this post!",
          cssClass:'post_text',
          inputs: [
            {
              name: 'title',
              placeholder: 'Title',
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Post',
              handler: data => {
                this.reduceImages(results).then(() => {
                  this.posttext = data.title;
                });
              }
            }
          ]
        });
        prompt.present();
      }, (err) => {
        console.log(err)
      });
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
            let prompt = this.alertCtrl.create({
              title: 'Post text',
              message: "Write something about this post!",
              cssClass:'post_text',
              inputs: [
                {
                  name: 'title',
                  placeholder: 'Title',
                },
              ],
              buttons: [
                {
                  text: 'Cancel',
                  handler: data => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Post',
                  handler: data => {
                    this.posttext = data.title;
                    this.photos.push(newImage);
                  }
                }
              ]
            });
            prompt.present();
          }, error => console.error("Error cropping image", error));
      }, function (error) {
        console.log(error);
      });
  }

  post_text() {
    let prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter a name for this new album you're so keen on adding",
      cssClass:'post_text',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.posttext = data.title;
          }
        }
      ]
    });
    prompt.present();
  }
  post(){
      let profileModal = this.modalCtrl.create('PostviewmodalPage');
      profileModal.present();
  }
}
