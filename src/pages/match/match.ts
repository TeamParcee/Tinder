import {Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import {SuperTabsController} from 'ionic2-super-tabs';
import {Geolocation} from '@ionic-native/geolocation';
import {NativeGeocoder} from '@ionic-native/native-geocoder';
import {LocationAccuracy} from '@ionic-native/location-accuracy';
import {
  StackConfig,
  DragEvent,
  SwingStackComponent,
  SwingCardComponent
} from 'angular2-swing';

@IonicPage()

@Component({
  selector: 'page-match',
  templateUrl: 'match.html',
  providers: [LocationAccuracy]
})

export class MatchPage {


  @ViewChild('myswing1') swingStack: SwingStackComponent;
  @ViewChildren('mycards1') swingCards: QueryList<SwingCardComponent>;
  faceImage: any = [];
  cards: Array<any>;
  stackConfig: StackConfig;
  recentCard: string = '';
  index: any = 0;
  next: any = "";
  index2: any = 2;
  lowerindex: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private superTabsCtrl: SuperTabsController, public toastCtrl: ToastController, public geolocation: Geolocation, public geocoder: NativeGeocoder, public locac: LocationAccuracy, public modalCtrl: ModalController) {
    this.stackConfig = {
      throwOutConfidence: (offsetX, offsetY, element) => {
        return Math.min(Math.abs(offsetX) / (element.offsetWidth / 2), 1);
      },
      transform: (element, x, y, r) => {
        this.onItemMove(element, x, y, r);
      },
      throwOutDistance: (d) => {
        return 800;
      }
    };
    this.getphoto("face", "1")
  }

  ionViewDidEnter() {
    this.superTabsCtrl.enableTabsSwipe(false,);
    this.find();
  }

  hidetutorial() {
    document.getElementById('tutorial').style.display = 'none'
  }

  ionViewWillLeave() {
    this.superTabsCtrl.enableTabsSwipe(true, 'optional tab ID to disable swiping on');
  }

  ngAfterViewInit() {
    // Either subscribe in controller or set in HTML
    this.swingStack.throwin.subscribe((event: DragEvent) => {
      event.target.style.background = '#ffffff';
    });

    this.cards = [{email: '', dob: ''}];
    this.addNewCards(1);
  }

  // Called whenever we drag an element
  onItemMove(element, x, y, r) {
    var color = '';
    var abs = Math.abs(x);
    let min = Math.trunc(Math.min(16 * 16 - abs, 16 * 16));
    let hexCode = this.decimalToHex(min, 2);

    var matchdislike = document.getElementById('dislike');
    var matchlike = document.getElementById('like');

    if (x < 0) {
      color = '#FF' + hexCode + 'FF' + hexCode;
      if (matchdislike || matchlike) {
        matchlike.style.display = 'block';
        matchdislike.style.display = 'none';
      }
    } else {
      color = '#' + hexCode + hexCode;
      document.getElementById('tutorial').style.display = 'none';
      if (matchlike || matchdislike) {
        matchlike.style.display = 'none';
        matchdislike.style.display = 'block';
      }
    }
    if (x == 0) {
      matchlike.style.display = 'none';
      matchdislike.style.display = 'none';
    }

    element.style.background = color;
    element.style['transform'] = `translate3d(0, 0, 0) translate(${x}px, ${y}px) rotate(${r}deg)`;
  }

// Connected through HTML
  voteUp(like: boolean) {
    let removedCard = this.cards.pop();
    this.addNewCards(1);
    if (like) {
      // this.recentCard = 'You liked: ' + removedCard.name.first;
      let toast = this.toastCtrl.create({
        message: 'You like' + ' ' + removedCard.name.first + ' ' + removedCard.name.last,
        duration: 1000,
        position: 'top',
        cssClass: 'add'
      });
      toast.present();
      this.match();
      //----------
      if (this.index2 < this.faceImage.length) {

        this.next = this.faceImage[this.index2];
        this.index2 = this.index2 + 2;
        this.index = this.index2;
        this.lowerindex = this.index2 - 2;
      }

      // console.log('index is:',this.index)
      // console.log(this.faceImage)


    } else {
      // this.recentCard = 'You disliked: ' + removedCard.name.first;
      let toast = this.toastCtrl.create({
        message: 'You dislike' + ' ' + removedCard.name.first + ' ' + removedCard.name.last,
        duration: 1000,
        position: 'top',
        cssClass: 'remove',
      });
      toast.present();
      if (this.index2 < this.faceImage.length) {
        console.log(this.index);
        this.next = this.faceImage[this.index2];
        this.index2 = this.index2 + 2;
        this.index = this.index2;
        this.lowerindex = this.index2 - 2;
      }
    }
  }

// Add new cards to our array
  addNewCards(count: number) {
    this.http.get('https://randomuser.me/api/?gender=female?nat=us?results=' + count)
      .map(data => data.json().results)
      .subscribe(result => {
        for (let val of result) {
          this.cards.push(val);
        }
      })

  }

// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
      hex = "0" + hex;
    }

    return hex;
  }


  getphoto(face, limit) {
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=Female&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        for (let val of x.results) {
          this.faceImage.push(val.urls.regular);
        }
      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })

    //--page2
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=Female&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        for (let val of x.results) {
          this.faceImage.push(val.urls.regular);
        }

      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })
    //---page3
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=Female&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        for (let val of x.results) {
          this.faceImage.push(val.urls.regular);
        }

      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })
    //-------page4
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=Female&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        for (let val of x.results) {
          this.faceImage.push(val.urls.regular);
        }

      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })
    //---------page5
    this.http.get('https://api.unsplash.com/search/photos?page=1&query=Female&client_id=1edfd72aa2a7578888b8f0ab7e353181567bf0918ece40c3b94ffb6f5a91c371')
      .subscribe(result => {
        var x = JSON.parse(result["_body"]);
        for (let val of x.results) {
          this.faceImage.push(val.urls.regular);
        }

        this.next = this.faceImage[0];

      }, (error) => {
        console.log((error));
        // alert('Unsplash Image Rate Limit Exceeded, Please try After One Hour Later')
      })
  }


  find() {

    setTimeout(function () {
      document.getElementById('card-stack').classList.add('active');
      document.getElementById('find').classList.add('hide')
    }, 5000);

    /*
        let options = {
          enableHighAccuracy: true
        };
        this.locac.canRequest().then((res: boolean) => {
          if (res) {
            this.locac.request(this.locac.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
              this.geolocation.getCurrentPosition(options).then((position: Geoposition) => {

                setTimeout(function () {
                  document.getElementById('profile_wrapper').classList.add('active');
                  document.getElementById('find').classList.add('hide')
                }, 3000);

              }).catch((err) => {
                alert(err);
              })
            }, (error) => {
              alert(error);

              setTimeout(function () {
                document.getElementById('profile_wrapper').classList.add('active');
                document.getElementById('find').classList.add('hide')
              }, 3000);

            })
          }
        })
    */
  }

  leftimg() {
    if (this.index < this.index2) {
      console.log(this.index);

      this.next = this.faceImage[this.index];
      this.index++;
      document.getElementById('first').style.opacity = '1';
      document.getElementById('second').style.opacity = '0.5';
    }
  }

  rightimg() {
    if (this.index > this.lowerindex) {
      console.log(this.index);

      this.next = this.faceImage[this.index];
      this.index--;
      document.getElementById('first').style.opacity = '0.5';
      document.getElementById('second').style.opacity = '1';
    }
  }

  details() {
    document.querySelector('page-match').classList.add('show_details');
  }

  hidedetails() {
    document.querySelector('page-match').classList.remove('show_details');
  }

  instagram() {
    let modal = this.modalCtrl.create('InstagramphotosPage');
    modal.present();
  }

  match() {
    let modal = this.modalCtrl.create('ProfilematchPage', {}, {cssClass: 'match'});
    modal.present();
  }
}
