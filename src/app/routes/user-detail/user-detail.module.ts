import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailRoutingModule } from './user-detail-routing.module';
import { UserDetailComponent } from './user-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DirectivesModule } from 'src/app/core/directives/directives.module';


@NgModule({
  declarations: [
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserDetailRoutingModule,
    SharedModule,
    DirectivesModule
  ]
})
export class UserDetailModule { }
