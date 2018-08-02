import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessagePage } from './message';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    MessagePage,
  ],
  imports: [
    IonicPageModule.forChild(MessagePage),
    IonicImageViewerModule,
    PdfViewerModule
  ],
})
export class MessagePageModule {}
