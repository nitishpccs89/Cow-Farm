import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendorderCheckoutPage } from './sendorder-checkout';

@NgModule({
  declarations: [
    SendorderCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(SendorderCheckoutPage),
  ],
})
export class SendorderCheckoutPageModule {}
