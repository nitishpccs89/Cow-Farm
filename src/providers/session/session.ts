import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SessionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SessionProvider {
private productDetail:any;
  constructor(public http: HttpClient) {
    console.log('Hello SessionProvider Provider');
  }
setProductDetail(data){
this.productDetail = data;
}
getProductDetail(){
  return this.productDetail;
}
private productList:any;
setProductList(data){
this.productList=data;
}
getProductList(){
  return this.productList;
  }
   catId =0;
  setCatId(id){
    this.catId = id
  }
  getCatId(){
    return this.catId;
  }
  addCartArr = [];
setAddCartArr(data){
  if(this.addCartArr.length>0){
    const selectedP =this.addCartArr.find(d=>{
      return d.postid == data.postid;
    });
    if(selectedP==undefined){
      this.addCartArr.push(data);
    }
    else{
      selectedP.orderProduct = data.orderProduct;
    }
  

  }
  else
  this.addCartArr.push(data);

  console.log(this.addCartArr);
}
getAddCatArr(){
  return this.addCartArr;
}
}
