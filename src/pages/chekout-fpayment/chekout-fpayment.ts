import { Component ,ViewChild,ChangeDetectorRef} from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
import {SessionProvider} from '../../providers/session/session';
/**
 * Generated class for the ChekoutFpaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chekout-fpayment',
  templateUrl: 'chekout-fpayment.html',
})
export class ChekoutFpaymentPage {
  @ViewChild('profileForm') profileForm; 
userLoginData  = JSON.parse(window.localStorage.getItem('userProfileData'));
  constructor(public navCtrl: NavController, public navParams: NavParams,public session:SessionProvider,
    private apiCall:ApicallProvider,private alertCtrl:AlertController,private cd:ChangeDetectorRef) {
  }
toatalCostArr:any=[];
toatalCost:number=0;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChekoutFpaymentPage');
    this.session.getAddCatArr().forEach(d=>{
      if(d.orderProduct>0){
      //  this.toatalCostArr.push((d.orderProduct*d.sell_price).toFixed(2));
        this.toatalCost =  this.toatalCost+(d.orderProduct*d.sell_price)
      }
    });
    console.log(this.toatalCostArr);
    this.getCitylist();
  }
  cityList:any = [];
  getCitylist(){
    let body = new FormData;
    this.apiCall.apiCallGeneric("api/citylist",body).subscribe(data=>
      {
        console.log(data)
        if(data.status){
        console.log(data);
     this.cityList = data.Citylist;
        this.getProfileData();
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
  getProfileData(){
    let body = new FormData;
    let userId:any = parseInt(this.userLoginData.id);
    body.append('userloginid',userId);
    
    this.apiCall.apiCallGeneric("api/profile",body).subscribe(data=>
      {
      
        if(data.user_api.status && data.user_api.id>0){
  
        this.profileForm.controls["fullname"].setValue(data.user_api.fullname);
        this.profileForm.controls["email"].setValue(data.user_api.email);
        this.profileForm.controls["phone"].setValue(data.user_api.phone);
        this.profileForm.controls["address"].setValue(data.user_api.address);
        setTimeout(()=>{
          this.profileForm.controls["cityid"].setValue(data.user_api.city);
          this.cd.detectChanges();
        }
    ,10)
        
  
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: data.user_api.msg,
            buttons: ['Ok']
          });
          alert.present();
        }
      },error=>{
        console.log(error);
      }
      )
  }

}
