import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { SvgpipePipe } from './svgpipe.pipe';
import { SpyDirective } from './spy-directive.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, SvgpipePipe, SpyDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
