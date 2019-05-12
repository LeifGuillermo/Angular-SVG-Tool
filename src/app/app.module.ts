import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SvgSandboxComponent } from './svg-sandbox/svg-sandbox.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgSandboxComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
