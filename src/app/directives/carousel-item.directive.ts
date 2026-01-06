import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCarouselItem]',
  standalone: true,
  exportAs: 'carouselItem'
})
export class CarouselItemDirective {

  constructor(public nativeElement: ElementRef) {}

}
