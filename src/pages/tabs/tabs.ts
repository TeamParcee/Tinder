import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
  providers:[SuperTabsController]
})
export class TabsPage {

  matchRoot = 'MatchPage'
  profileRoot = 'ProfilePage'
  messageRoot = 'ChatlistPage'


  constructor(public navCtrl: NavController) {}

}
