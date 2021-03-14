import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {SessionProvider} from '../../providers/session/session';
/**
 * Generated class for the CheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public session:SessionProvider,private alertCtrl:AlertController) {
  }
checkOut:any=[];
  ionViewDidLoad() {
  //  this.checkOut = [...this.session.getAddCatArr()];
    if(this.session.getAddCatArr().length>0){
      this.session.getAddCatArr().forEach(d=>{
        if(d.orderProduct>0){
          this.checkOut.push(d);
        }
      })
    }
  }
  gotoProductSection(){
    this.navCtrl.push('ProductSectionPage');
  }
  gotoProfiepage(){
    this.navCtrl.push('ProfilePage');
  }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }
  gotoSendorderCheckout(){
    this.navCtrl.push('PaymentDetailPage');
  }

  reducePc(id,count){
    if(count>0){
      let pCount = count-1;
     const data = this.checkOut.find(p=>{
       
        return id==p.postid
       
      })
      data["orderProduct"] = pCount
    }
    
  }
  addPc(id,count){
   let pCount = count+1;
    const data = this.checkOut.find(p=>{
       
      return id==p.postid
     
    })
    data["orderProduct"] = pCount
  }
  paymentDo(){
    if(this.checkOut.length>0)
    this.navCtrl.push("ChekoutFpaymentPage")
    else{
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Your Card is empty',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  paymentDo(){
    if(this.checkOut.length>0)
    this.navCtrl.push("ChekoutFpaymentPage")
    else{
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Your Card is empty',
        buttons: ['Ok']
      });
      alert.present();
    }
  }
  deleteData(postId){
    let index :any
    this.session.getAddCatArr().forEach((d,i)=>{
      if(d.postid==postId){
        index = i
      }
    });
    if(index!=undefined){
let cartData = this.session.getAddCatArr();
cartData.splice(index, 1);

    }
    let indexLocal
    this.checkOut.forEach((d,i)=>{
      if(d.postid==postId){
        indexLocal = i
      }
    });
    if(indexLocal!=undefined){

this.checkOut.splice(indexLocal, 1);

    }
  }
  
}
