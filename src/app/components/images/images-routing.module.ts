import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ImageDetailsComponent } from "./image-details/image-details.component";
import { ImagesListComponent } from "./images-list/images-list.component";

export const routes: Routes = [
    {
        path: ':id',
        component: ImageDetailsComponent
    },
    {
      path: '',
      component: ImagesListComponent
    },
  ];
  
  
  @NgModule({
    declarations: [],
    imports: [
      RouterModule.forChild(routes)],
    exports: [
      RouterModule,
    ],
  })
  export class ImagesRoutingModule {
  }