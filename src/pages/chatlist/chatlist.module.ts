import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatlistPage } from './chatlist';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { HideFabDirective } from '../../directives/hidefab/hidefab';

@NgModule({
  declarations: [
    HideFabDirective,
    ChatlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatlistPage),
    IonicImageViewerModule
  ],
})
export class ChatlistPageModule {}
