import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController  } from 'ionic-angular';



/**
 * Generated class for the AddRemoveCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-remove-card',
  templateUrl: 'add-remove-card.html',
})
export class AddRemoveCardPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {}

  presentModal() {
    const modal = this.modalCtrl.create(AddRemoveCardPage);
    modal.present();
    // this.navCtrl.push('AddRemoveCardPage')
    
  }
  dismiss() {
    this.viewCtrl.dismiss()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddRemoveCardPage');
  }

}
