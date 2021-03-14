import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PaymentDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-detail',
  templateUrl: 'payment-detail.html',
})
export class PaymentDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentDetailPage');
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
    this.navCtrl.push('AddRemoveCardPage');
  }
  gotoSendorderCheckout(){
    this.navCtrl.push('SendorderCheckoutPage');
  }
  
}
