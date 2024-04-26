import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_ZORRO_MODULES } from './shared-ng-zorro.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...NG_ZORRO_MODULES
  ],
  exports: [
    ...NG_ZORRO_MODULES
  ]
})
export class SharedModule { }
