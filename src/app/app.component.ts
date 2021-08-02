import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges
} from '@angular/core';

//This is required
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { base64Image, svg } from './imagedata';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnChanges, AfterContentChecked, AfterViewInit, AfterViewChecked {
  iswitch = false;
  myImageKey = 'imgKey';
  blob: Blob;
  url: string;
  img$: Subject<string> = new BehaviorSubject(svg);
  imgPiped$: Observable<SafeResourceUrl>
  //Constructor Required
  constructor(private sanitizer: DomSanitizer) {
    this.blob = new Blob([svg], { type: 'image/svg+xml' });
    this.url = URL.createObjectURL(this.blob);
    this.imgPiped$ = this.img$.pipe(tap(str => console.log("img: ",str.substring(0,15))),map(raw => this.sanitizer.bypassSecurityTrustResourceUrl(raw)));
  }
  ngAfterViewChecked(): void {
    // console.log('After View chk');
  }

  public ngAfterViewInit(): void {
    console.log('After View Iinit');
  }

  public getHeading() {
    return 'F.O.O' ;
  }

  public ngAfterContentChecked(): void {
    //console.log('After Content Chk');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);
  }

  onClickMe() {
    console.log('clk!');
    this.iswitch=!this.iswitch;
    const str = this.iswitch ? base64Image : svg
    this.img$.next(str)
  }

  //Call this method in the image source, it will sanitize it.
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getBase64());
  }

  transform2(key:string='svg') {
    
    return key==='svg'? this.sanitizer.bypassSecurityTrustResourceUrl(
       this.getSvg()
    ): this.sanitizer.bypassSecurityTrustResourceUrl(this.getBase64());
  }

  transformBlob() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  getSvg(): string {
    return svg;
  }

  getBase64(): string {
    return base64Image;
  }
}
