import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostpopoverPage } from './postpopover';

@NgModule({
  declarations: [
    PostpopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(PostpopoverPage),
  ],
  exports: [
    PostpopoverPage
  ]
})
export class PostpopoverPageModule {}
