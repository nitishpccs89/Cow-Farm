import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SendorderCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendorder-checkout',
  templateUrl: 'sendorder-checkout.html',
})
export class SendorderCheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendorderCheckoutPage');
  }
  gotoProductSection(){
    this.navCtrl.push('ProductSectionPage');
  }
  gotoProfilepage(){
    this.navCtrl.push('ProfilePage');
  }
  gotoCheckOutpage(){
    this.navCtrl.push('CheckoutPage');
  }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }
  
  presentModal(){
    this.navCtrl.push('ThankYouPage');
  }
  gotoPaymentDetail(){
    this.navCtrl.push('PaymentDetailPage');
  }

}
