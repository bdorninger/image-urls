import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';

//This is required
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { base64Image, encSVG, jpg, png, svg, svg2 } from './imagedata';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnChanges, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  iswitch = false;
  myImageKey = 'imgKey';
  blob: Blob;
  blob2: Blob;
  url: string;
  url2: SafeResourceUrl;
  url3: SafeResourceUrl;
  url4: SafeResourceUrl;
  img$: Subject<string> = new BehaviorSubject(svg);
  imgPiped$: Observable<SafeResourceUrl>;
  //Constructor Required
  constructor(private sanitizer: DomSanitizer) {
    this.blob = new Blob([svg2], { type: 'image/svg+xml' });
    this.url = URL.createObjectURL(this.blob);
    this.imgPiped$ = this.img$.pipe(      
      map(raw => this.sanitizer.bypassSecurityTrustResourceUrl(raw))
    );

    //
    const ui8png = new Uint8Array(png);
    console.log("png", ui8png,ui8png.buffer.byteLength, ui8png.byteLength)
        
    this.url2 = this.createBlobUrl(ui8png, 'image/png');
    console.log(`u2`,this.url2)

    const ui8svg = new Uint8Array(encSVG);
    console.log("svg", ui8svg,ui8svg.buffer.byteLength, ui8svg.byteLength)
        
    this.url3 = this.createBlobUrl(ui8svg, 'image/svg+xml');
    console.log(`u3`,this.url3)

    const ui8jpg = new Uint8Array(jpg);
    console.log("jpg", ui8jpg,ui8jpg.buffer.byteLength, ui8jpg.byteLength)
        
    this.url4 = this.createBlobUrl(ui8jpg, 'image/jpg');
    console.log(`u4`,this.url4)
  }
  ngAfterViewChecked(): void {
    // console.log('After View chk');    
  }

  private createBlobUrl(img: Uint8Array, type?: string) {
    const blob = new Blob([img.buffer], { type: type})
    const objUrl = URL.createObjectURL(blob);
    console.log('objUrl',objUrl)
    return this.sanitizeUrl(objUrl);
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.url);
    // URL.revokeObjectURL((this.url2 as any).changingThisBreaksApplicationSecurity);
  }

  public ngAfterViewInit(): void {
    console.log('After View Iinit');
  }

  public getHeading() {
    return 'F.O.O';
  }

  public ngAfterContentChecked(): void {
    //console.log('After Content Chk');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);
  }

  onClickMe() {
    console.log('clk!');
    this.iswitch = !this.iswitch;
    const str = this.iswitch ? base64Image : svg;
    this.img$.next(str);
  }

  //Call this method in the image source, it will sanitize it.
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getBase64());
  }

  transform2(key: string = 'svg') {
    return key === 'svg'
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.getSvg())
      : this.sanitizer.bypassSecurityTrustResourceUrl(this.getBase64());
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getSvg(): string {
    return svg;
  }

  getBase64(): string {
    return base64Image;
  }
}
