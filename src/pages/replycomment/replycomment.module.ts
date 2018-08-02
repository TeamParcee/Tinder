import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReplycommentPage } from './replycomment';

@NgModule({
  declarations: [
    ReplycommentPage,
  ],
  imports: [
    IonicPageModule.forChild(ReplycommentPage),
  ],
  exports: [
    ReplycommentPage
  ]
})
export class ReplycommentPageModule {}
