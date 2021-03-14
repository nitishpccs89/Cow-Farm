import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRemoveCardPage } from './add-remove-card';

@NgModule({
  declarations: [
    AddRemoveCardPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRemoveCardPage),
  ],
})
export class AddRemoveCardPageModule {}
