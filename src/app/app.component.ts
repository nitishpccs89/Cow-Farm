import { Component, ViewChild,ChangeDetectorRef } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
// import { BeforeLoginPage } from '../pages/before-login/before-login';
import { LoginPage } from '../pages/login/login';
import {ProductSectionPage} from '../pages/product-section/product-section';
import { ListPage } from '../pages/list/list';
import {SessionProvider} from '../providers/session/session';
import {ApicallProvider} from '../providers/apicall/apicall';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;// = LoginPage;

  pages: Array<{title: string, component: any,catId:any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,private apiCall:ApicallProvider,
     public splashScreen: SplashScreen,private session: SessionProvider,private cd:ChangeDetectorRef) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
     
      const userP = window.localStorage.getItem('userProfileData');
      console.log(userP);
      if(userP==null || userP==undefined || userP=="null")
      this.rootPage = 'LoginPage'
      else  this.getCatergoryList();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario;
    this.session.setCatId(page.catId);
    this.nav.setRoot(page.component);
  }

  getCatergoryList(){
    let body = new FormData;
    
    
    this.apiCall.apiCallGeneric("/api/categorylist",body,false).subscribe(data=>
      {
      
        if(data.status ){
  console.log(data);
  data.Citylist.forEach(d=>{
    this.pages.push({ title: d.name, component: 'ProductSectionPage', catId: d.id })
  })
 this.cd.detectChanges();
  this.rootPage = 'ProductSectionPage'
  
        }
        else{
         
        }
      },error=>{
        console.log(error);
      }
      )
  }
}
