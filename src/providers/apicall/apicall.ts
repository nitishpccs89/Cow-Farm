import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController  } from 'ionic-angular';
import { map, catchError } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';
/*
  Generated class for the ApicallProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApicallProvider {

  constructor(public http: HttpClient,private loadingCtrl: LoadingController) {
    console.log('Hello ApicallProvider Provider');
  }

  apiCallGeneric(urls,body,loaderS=true) {	
    let Constants = {	
      API_BaseUrl:"https://cowtownfarmsgh.com/"	
    }	
     let loader = this.loadingCtrl.create({	
        content: 'Please wait...',	
      });	
      if(loaderS)
      loader.present();	
      let headers1 = new HttpHeaders()	
        .set('Access-Control-Allow-Origin', '*')	
       
       
      return  this.http.post(Constants.API_BaseUrl+urls,body).	
          pipe(	
             map((data: any) => {	
              if(loaderS)
                loader.dismiss();	
               return data;	
             }), catchError( error => {	
              if(loaderS)
                loader.dismiss();	
             return _throw( 'Something went wrong!' );	
             })	
          )	
    }	

}
