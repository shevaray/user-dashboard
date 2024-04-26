import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchDirective } from './user-search/search.directive';
import { HoverCursorPointerDirective } from './cursor-pointer/cursor-pointer.directive';



@NgModule({
  declarations: [UserSearchDirective, HoverCursorPointerDirective],
  imports: [CommonModule],
exports:[UserSearchDirective, HoverCursorPointerDirective]
})
export class DirectivesModule { }
