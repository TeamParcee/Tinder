import {Directive, Input, Renderer, ElementRef} from '@angular/core';

@Directive({
  selector: '[hide-fab]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideFabDirective {

  oldScrollTop: number = 0;

  constructor(private renderer: Renderer, private element: ElementRef) {

  }

  onContentScroll(e) {

    let fabToHide = document.getElementById("fab");

    if (e.scrollTop - this.oldScrollTop > 10) {
      // console.log("DOWN");
      fabToHide.className = 'non_active';
    } else if (e.scrollTop - this.oldScrollTop < 0) {
      // console.log("UP");
      fabToHide.className = 'active';
    }

    this.oldScrollTop = e.scrollTop;
  }

}
