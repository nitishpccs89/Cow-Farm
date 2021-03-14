import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  @ViewChild('resetForm') resetForm; 
  constructor(public navCtrl: NavController, public navParams: NavParams,private apiCall:ApicallProvider,private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  sendDataEmailId(){
    
    if(!this.resetForm.valid){
      let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'All fields are mandatory.',
                  buttons: ['Ok']
                });
                alert.present();
              
    return
    }
    let body = new FormData;
    body.append('email',this.resetForm.value.email);
    
    this.apiCall.apiCallGeneric("api/forgotpassword",body).subscribe(data=>
      {
        console.log(data)
        if(data.status){
          let alert = this.alertCtrl.create({
            title: 'Alert',
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
