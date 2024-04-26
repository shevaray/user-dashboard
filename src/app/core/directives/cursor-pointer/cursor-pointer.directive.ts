import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[HoverCursorPointer]'
})
export class HoverCursorPointerDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.setCursor('pointer');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setCursor('');
  }

  private setCursor(cursorStyle: string) {
    this.elementRef.nativeElement.style.cursor = cursorStyle;
  }

}
