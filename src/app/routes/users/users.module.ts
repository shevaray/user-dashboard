import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from 'src/app/core/directives/directives.module';


@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    SharedModule,
    DirectivesModule
  ]
})
export class UsersModule { }
