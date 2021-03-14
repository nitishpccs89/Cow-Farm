import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    ReactiveFormsModule,
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
