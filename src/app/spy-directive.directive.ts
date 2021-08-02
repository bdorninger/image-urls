import { AfterViewChecked, AfterViewInit, Directive, ElementRef, Host, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[spyme]'
})
export class SpyDirective implements OnInit, OnDestroy, AfterViewChecked {
  constructor(@Host() private readonly elem: ElementRef) {
    console.log('elem', elem);
  }
ngAfterViewChecked(): void {
   console.log('spy after view check')   
}
  ngOnDestroy(): void {
    console.log('elem destroy:', this.elem);
  }
  ngOnInit(): void {
    console.log('elem init:', this.elem);
  }
}
