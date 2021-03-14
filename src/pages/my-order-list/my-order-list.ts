import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
import {SessionProvider} from '../../providers/session/session';
// import { OrderListPage } from '../order-list/order-list';

/**
 * Generated class for the MyOrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-order-list',
  templateUrl: 'my-order-list.html',
})
export class MyOrderListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl:AlertController,private apiCall:ApicallProvider,private session: SessionProvider) {
  }
  productdetails:any;
  orderdetails:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrderListPage');
   const transId =  this.navParams.get('transactionId');
   const userId =  this.navParams.get('userId');
   console.log(transId);
   console.log(userId);
  this.getOrderDetail(transId,userId)
  }

  getOrderDetail(transId,userId){
    let body = new FormData;
    body.append('userid',userId);
    body.append('transiotion_id',transId);
    
    this.apiCall.apiCallGeneric("api/myorderview",body).subscribe(data=>
      {
      
        if(data.status){
          this.orderdetails = data.orderdetails;
          this.productdetails = data.productdetails;
  console.log(data.datalist)
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: data.msg,
            buttons: ['Ok']
          });
          alert.present();
        }
      },error=>{
        console.log(error);
      }
      )
  }
  gotoProductSection(){
    this.navCtrl.push('ProductSectionPage');
  }
  gotoProfiepage(){
    this.navCtrl.push('ProfilePage');
  }
  gotoCheckOutpage(){
    this.navCtrl.push('CheckoutPage');
  }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }
  gotoOrderDetails(){
    this.navCtrl.push('CheckoutPage');
  }

}
