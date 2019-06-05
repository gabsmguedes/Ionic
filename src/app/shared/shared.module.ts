import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";

@NgModule({
  exports: [
      CommonModule,
      ReactiveFormsModule,
      IonicModule
  ]
})
export class SharedModule { }
