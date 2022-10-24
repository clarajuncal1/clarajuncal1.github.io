import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialSharedModule } from "src/app/shared/material-shared.module";
import { SearchComponent } from "./search.component";

@NgModule({
    declarations: [
        SearchComponent,
    ],
    imports: [
      CommonModule,
      MaterialSharedModule, 
      ReactiveFormsModule,
    ],
    exports: [
      SearchComponent,
    ],
  })
  export class SearchModule { }