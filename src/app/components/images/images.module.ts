import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesListComponent } from './images-list/images-list.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { MaterialSharedModule } from 'src/app/shared/material-shared.module';
import { SearchModule } from '../search/search.module';
import { ImagesRoutingModule } from './images-routing.module';



@NgModule({
  declarations: [
    ImagesListComponent,
    ImageDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
    SearchModule,
    ImagesRoutingModule,
  ],
  exports: [
    ImagesListComponent,
    ImageDetailsComponent
  ],
})
export class ImagesModule { }
