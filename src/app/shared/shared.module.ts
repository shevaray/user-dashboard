import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_MATERIAL_MODULES } from './ng-material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...NG_MATERIAL_MODULES
  ],
  exports: [
    ...NG_MATERIAL_MODULES
  ]
})
export class SharedModule { }
