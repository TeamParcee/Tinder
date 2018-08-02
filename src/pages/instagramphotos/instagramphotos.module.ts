import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InstagramphotosPage } from './instagramphotos';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    InstagramphotosPage,
  ],
  imports: [
    IonicPageModule.forChild(InstagramphotosPage),
    IonicImageViewerModule
  ],
})
export class InstagramphotosPageModule {}
