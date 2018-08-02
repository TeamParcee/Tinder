import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostviewmodalPage } from './postviewmodal';

@NgModule({
  declarations: [
    PostviewmodalPage,
  ],
  imports: [
    IonicPageModule.forChild(PostviewmodalPage),
  ],
  exports: [
    PostviewmodalPage
  ]
})
export class PostviewmodalPageModule {}
