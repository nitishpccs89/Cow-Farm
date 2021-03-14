import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild('loginForm') loginForm; 
  constructor(public navCtrl: NavController,private alertCtrl:AlertController,
     public navParams: NavParams,private apiCall:ApicallProvider) {
  }

  ionViewDidLoad() {
   // window.localStorage.setItem("userProfileData",'{"status":true,"msg":"Login Successully","id":"45","fullname":"apidd33","email":"distributor_ie22@cowtownfarmsgh.com","phone":"9876547895","address":"japur ","image":"https:\/\/cowtownfarmsgh.com\/staging\/admin\/uploadimg\/user_1614669946.png","city":"1","cityname":null,"deliverycharge":null}')
    console.log('ionViewDidLoad LoginPage');
  }
  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }
  goToProductSection(){
    if(!this.loginForm.valid){
      let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'All fields are mandatory.',
                  buttons: ['Ok']
                });
                alert.present();
              
    return
    }
    let body = new FormData;
    body.append('email',this.loginForm.value.email);
    body.append('password',this.loginForm.value.password);
    this.apiCall.apiCallGeneric("api/login",body).subscribe(data=>
      {
        console.log(data)
        if(data.user_api.status && data.user_api.id>0){
          window.localStorage.setItem("userProfileData",JSON.stringify(data.user_api))
          this.navCtrl.push('ProductSectionPage');
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: data.user_api.msg,
            buttons: ['Ok']
          });
          alert.present();
        }
      })
  
  }
  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

}
