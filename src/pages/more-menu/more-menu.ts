import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SessionProvider} from '../../providers/session/session';
/**
 * Generated class for the MoreMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more-menu',
  templateUrl: 'more-menu.html',
})
export class MoreMenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public session:SessionProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreMenuPage');
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
  gotoPaymentDetail(){
    this.navCtrl.push('PaymentDetailPage');
  }
  gotoMyOrderList(){
    this.navCtrl.push('OrderListPage');
  }
  gotoNotifications(){
    this.navCtrl.push('NotificationsPage');
  }

}
