import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild('registrationForm') registrationForm; 
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private apiCall:ApicallProvider,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  goToLoginpage(){
  
  }
  registerUserApi(){
    if(this.registrationForm.controls.email.valid==false){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please provide valid email id.',
        buttons: ['Ok']
      });
      alert.present();
    
return
    }
    if(!this.registrationForm.valid){
      let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'All fields are mandatory.',
                  buttons: ['Ok']
                });
                alert.present();
              
    return
    }
    if(this.registrationForm.value.password!=this.registrationForm.value.passConfirm){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Password and Confirm Password are not matched.',
        buttons: ['Ok']
      });
      alert.present();
    
return
    }
    if(this.registrationForm.value.mobile.length!=10){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Please provide valid mobile number.',
        buttons: ['Ok']
      });
      alert.present();
    
return
    }
 
    let body = new FormData;
    body.append('usertype',this.registrationForm.value.usertype);
    body.append('fullname',this.registrationForm.value.fullname)
    body.append('email',this.registrationForm.value.email)
    body.append('mobile',this.registrationForm.value.mobile)
    body.append('password',this.registrationForm.value.password)
    console.log(body);
    this.apiCall.apiCallGeneric("api/registration",body).subscribe(data=>
      {
        console.log(data)
        if(data.status && data.uid>0){
          let alert = this.alertCtrl.create({
            title: 'Success',
            subTitle: data.msg,
            buttons: ['Ok']
          });
          alert.present();
          this.navCtrl.pop();
        }
        else{
          let alert = this.alertCtrl.create({
            title: 'Failure',
            subTitle: data.msg,
            buttons: ['Ok']
          });
          alert.present();
        }
      })
  }

}
