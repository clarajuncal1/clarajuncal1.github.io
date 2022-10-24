import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details.component';
import { MaterialSharedModule } from 'src/app/shared/material-shared.module';


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    MaterialSharedModule,
  ],
  exports: [
    UserDetailsComponent,
  ],
})
export class UserDetailsModule { }
