import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SuperTabsController } from 'ionic2-super-tabs';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import * as firebase from 'firebase';
import { AuthProvider } from '../providers/auth/auth';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0cr5s_hTaHgCrxQz4O3zutU1Mcq-uSZA",
    authDomain: "checkdn-914.firebaseapp.com",
    databaseURL: "https://checkdn-914.firebaseio.com",
    projectId: "checkdn-914",
    storageBucket: "checkdn-914.appspot.com",
    messagingSenderId: "118221588888"
  };
  firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule,
    HttpModule,
    SwingModule,
    IonicImageViewerModule,
    PdfViewerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SuperTabsModule,
    Geolocation,
    NativeGeocoder,
    SuperTabsController,
    Camera,
    ImagePicker,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
  ]
})
export class AppModule {}
