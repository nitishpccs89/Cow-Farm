import { Component,ViewChild,ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {ApicallProvider} from '../../providers/apicall/apicall';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import {imgProfile} from './imageConst';
import { DomSanitizer } from '@angular/platform-browser';
import {SessionProvider} from '../../providers/session/session';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('profileForm') profileForm; 
userLoginData  = JSON.parse(window.localStorage.getItem('userProfileData'));
  constructor(public navCtrl: NavController, public navParams: NavParams,public cd:ChangeDetectorRef,
     public _DomSanitizationService: DomSanitizer,public session:SessionProvider,
    private apiCall:ApicallProvider,private alertCtrl:AlertController,private camera: Camera,public actionSheetCtrl: ActionSheetController) {
  }
  profileImg:any = imgProfile;
  savedImage:any = 'data:image/jpeg;base64,' +imgProfile;
  cityList:any = [{id:0,cityname:'Select City',delivery_charge:'0'}];
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getCitylist()
   
  }
  
  captureImageClick(sT){
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType:sT
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    // this.profileImg = imageData
     this.savedImage = 'data:image/jpeg;base64,' + imageData;
    // let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
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
        
       this.savedImage = data.user_api.image
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

  updateProfile(){
    if(!this.profileForm.valid){
      let alert = this.alertCtrl.create({
                  title: 'Alert',
                  subTitle: 'All fields are mandatory.',
                  buttons: ['Ok']
                });
                alert.present();
              
    return
    }
    let body = new FormData;
    let userId:any = parseInt(this.userLoginData.id);
    body.append('userid',userId);
    body.append('fullname',this.profileForm.value.fullname);
    body.append('phone',this.profileForm.value.phone);
    body.append('address',this.profileForm.value.address);
   
    body.append('cityid',this.profileForm.value.cityid);
    if(this.savedImage.indexOf('cowtownfarmsgh.com')==-1)
    body.append('pic',this.savedImage);
    body.append('email',this.profileForm.value.email);
    body.append('deliverycharge',this.profileForm.value.deliverycharge);
    
    this.apiCall.apiCallGeneric("api/updateprofile",body).subscribe(data=>
      {
        console.log(data)
        if(data.status ){
        console.log(data.user_api);
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: data.msg,
          buttons: ['Ok']
        });
        alert.present();
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

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Capture Profile Image',
      buttons: [
        {
          text: 'Click Picture',
          handler: () => {
           this.captureImageClick(1);
          }
        },{
          text: 'Choose Picture',
          handler: () => {
            this.captureImageClick(0);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  gotoProductSection(){
    this.navCtrl.push('ProductSectionPage');
  }
  gotoCheckOutpage(){
    this.navCtrl.push('CheckoutPage');
  }
  // gotoProfilepage(){
  //   this.navCtrl.push('ProfilePage');
  // }
  gotoMoremenupage(){
    this.navCtrl.push('MoreMenuPage');
  }

  logoutFun(){
    window.localStorage.setItem('userProfileData',null);
    this.navCtrl.setRoot('LoginPage')
  }
  
  showPasswordRest() {
    let alert = this.alertCtrl.create();
    alert.setTitle("Password Reset");

    alert.addInput({
      type: 'text',
      label: 'Old Password',
      value: '',
      
    });

    alert.addInput({
      type: 'password',
      label: 'New Password',
      value: ''
    });

    alert.addInput({
      type: 'text',
      label: 'Confirm Password',
      value: ''
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Reset',
      handler: data => {
       
     this.resetPassword(data)
      }
    });
    alert.present();
  }
 
  resetPassword(data){
    console.log('Checkbox data:', data);
    if(data[0]=="" || data[1]=="" || data[2]==""){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'All fields are mandatory.',
        buttons: ['Ok']
      });
      alert.present();
    
return
    }

    if(data[1]!=data[2]){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: 'Password and Confirm Password is mismatched',
        buttons: ['Ok']
      });
      alert.present();
    }
   
    let body = new FormData;
    let userId:any = parseInt(this.userLoginData.id);
    body.append('userid',userId);
    body.append('oldpassword',data[0]);
    body.append('newpassword',data[1]);
   
  
    
    this.apiCall.apiCallGeneric("api/updatepassword",body).subscribe(data=>
      {
        console.log(data)
        if(data.status ){
        console.log(data.user_api);
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: data.msg,
          buttons: ['Ok']
        });
        alert.present();
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


}
