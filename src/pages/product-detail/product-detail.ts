import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {SessionProvider} from '../../providers/session/session';
import { DomSanitizer } from '@angular/platform-browser';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
productImg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alert:AlertController,
    public session:SessionProvider, public _DomSanitizationService: DomSanitizer) {
  }
productDetail:any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
   this.productDetail =this.session.getProductDetail();
   this.productImg = this._DomSanitizationService.bypassSecurityTrustStyle(`url(${this.productDetail.image})`);
  }

  getDetailOfProduct(){

  }
  gotoProductSection(){
    this.navCtrl.push('ProductSectionPage');
  }
  gotoCheckOutpage(){
    //console.log(this.productDetail);
    this.session.setAddCartArr(this.productDetail);
    if(this.productDetail.orderProduct==0){
      let alert = this.alert.create({
        title: 'Alert',
        subTitle: 'Please add at least one product.',
        buttons: ['Ok']
      });
      alert.present();
    }
    else{
      this.navCtrl.push('CheckoutPage');
    }

    //this.navCtrl.push('CheckoutPage');
  }
  gotoProfilepage(){
    this.navCtrl.push('ProfilePage');
  }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }

  reducePc(id,count){
    if(count>0){
      let pCount = count-1;
     const data = this.session.getProductList().find(p=>{
       
        return id==p.postid
       
      })
     data["orderProduct"] = pCount
    }
    
  }
  addPc(id,count){
   let pCount = count+1;
    const data = this.session.getProductList().find(p=>{
       
      return id==p.postid
     
    })
    data["orderProduct"] = pCount
  }

}
