import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MatchPage } from './match';
import { HttpModule } from '@angular/http';
import { SwingModule } from 'angular2-swing';

@NgModule({
  declarations: [
    MatchPage,
  ],
  imports: [
    IonicPageModule.forChild(MatchPage),
    HttpModule,
    SwingModule,
  ],
})
export class MatchPageModule {}
