import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  SimpleChanges
} from '@angular/core';

//This is required
import { DomSanitizer } from '@angular/platform-browser';
import { base64Image, svg } from './imagedata';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent
  implements OnChanges, AfterContentChecked, AfterViewInit, AfterViewChecked {
  myImageKey = 'imgKey';
  blob: Blob;
  url: string;
  //Constructor Required
  constructor(private sanitizer: DomSanitizer) {
    this.blob = new Blob([svg], { type: 'image/svg+xml' });
    this.url = URL.createObjectURL(this.blob);
  }
  ngAfterViewChecked(): void {
    // console.log('After View chk');
  }

  public ngAfterViewInit(): void {
    console.log('After View Iinit');
  }

  public getHeading() {
    return 'F.O.O' + new Date();
  }

  public ngAfterContentChecked(): void {
    //console.log('After Content Chk');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes: ', changes);
  }

  onClickMe() {
    console.log('clk!');
  }

  //Call this method in the image source, it will sanitize it.
  transform() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.getBase64());
  }

  transform2() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      'data:image/svg+xml,' + this.getSvg()
    );
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
