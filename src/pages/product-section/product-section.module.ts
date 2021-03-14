import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSectionPage } from './product-section';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    ProductSectionPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ProductSectionPage),
  ],
})
export class ProductSectionPageModule {}
