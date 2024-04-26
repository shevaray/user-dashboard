import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[userSearch]'
})
export class UserSearchDirective {
  @Output() enterKeyPressed: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  @HostListener('keydown.enter', ['$event'])
  onEnterKeyDown(event: KeyboardEvent) {
    event.preventDefault(); // Prevent the default action of the Enter key
    this.enterKeyPressed.emit(); // Emit an event when the Enter key is pressed
  }

}
