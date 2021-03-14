import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
import {SessionProvider} from '../../providers/session/session';
/**
 * Generated class for the OrderListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html',
})
export class OrderListPage {
  userLoginData  = JSON.parse(window.localStorage.getItem('userProfileData'));
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiCall:ApicallProvider,private alertCtrl:AlertController,private session: SessionProvider) {
  }
orderList:any=[];
  ionViewDidLoad() {
  this.getOrderList();
  }
  getOrderList(){
    let body = new FormData;
    let userId:any = parseInt(this.userLoginData.id);
    body.append('userid',"10");
    
    this.apiCall.apiCallGeneric("api/myorder",body).subscribe(data=>
      {
      
        if(data.status){
  this.orderList = data.datalist
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
  gotoOrderDetails(transactionId){
    let userId:any = parseInt(this.userLoginData.id);
    this.navCtrl.push('MyOrderListPage',{transactionId:transactionId,userId:"10"})
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

}
