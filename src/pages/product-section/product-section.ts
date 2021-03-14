import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
import {SessionProvider} from '../../providers/session/session';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";

/**
 * Generated class for the ProductSectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-section',
  templateUrl: 'product-section.html',
})
export class ProductSectionPage {
  productList = {cat:''}
  public searchControl: FormControl;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiCall:ApicallProvider,private alertCtrl:AlertController,private session: SessionProvider) {
    this.searchControl = new FormControl();
  }
productListData:any = [];
productListDataSearch :any [];
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductSectionPage');
    this.setFilteredItems("");
    this.searchControl.valueChanges
    .pipe(debounceTime(700))
    .subscribe(search => {
      this.setFilteredItems(search);
    });
    this.getProductlist();
  }
  setFilteredItems(searchTerm) {
    if(this.productListDataSearch && this.productListDataSearch.length>0){
      this.productListData = this.productListDataSearch.filter(item => {
        return item.product_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
      console.log(this.productListData);
    }
    
  }
currentPage = 0;
  getProductlist(){
    let body = new FormData;
    if(this.session.getCatId() != 0){
      body.append('category',this.session.getCatId().toString())
    }
    
    this.apiCall.apiCallGeneric("api/productlist",body).subscribe(data=>
      {
      
        if(data.status ){
  console.log(data);
  this.productListData = data.datalist;
  this.session.setProductList(this.productListData );
  this.productListDataSearch = [...this.productListData];
  this.productListData.forEach(p=>{
    p["orderProduct"] = 1
  })
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
 
  gotoProfilepage(){
    this.navCtrl.push('ProfilePage');
  }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }
  gotoProductDetail(selectedP){
    this.session.setProductDetail(selectedP);
    
    this.navCtrl.push('ProductDetailPage');
  }
  reducePc(id,count){
    if(count>0){
      let pCount = count-1;
     const data = this.productListData.find(p=>{
       
        return id==p.postid
       
      })
      data["orderProduct"] = pCount
    }
    
  }
  addPc(id,count){
   let pCount = count+1;
    const data = this.productListData.find(p=>{
       
      return id==p.postid
     
    })
    data["orderProduct"] = pCount
  }
  items = [];
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
this.currentPage = this.currentPage+1;

let body = new FormData;

  body.append('nextpage',this.currentPage.toString())


this.apiCall.apiCallGeneric("api/productlist",body,false).subscribe(data=>
  {
  
    if(data.status ){
console.log(data);
infiniteScroll.complete();
// this.productListData = data.datalist;
// this.session.setProductList(this.productListData );
// this.productListDataSearch = [...this.productListData];
// this.productListData.forEach(p=>{
// p["orderProduct"] = 0
// })
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
);

    // setTimeout(() => {
    //   for (let i = 0; i < 30; i++) {
    //     this.items.push( this.items.length );
    //   }

    //   console.log('Async operation has ended');
    //   infiniteScroll.complete();
    // }, 500);
  }
  addProduct(data){
    //console.log(this.productDetail);
    this.session.setAddCartArr(data);
    if(data.orderProduct==0){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please add at least one product.',
        buttons: ['Ok']
      });
      alert.present();
    }
    //this.navCtrl.push('CheckoutPage');
  }
  gotoCheckOutpage(data){
    this.navCtrl.push('CheckoutPage');
  }
}
