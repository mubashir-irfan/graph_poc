import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphModule } from './graph/graph.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    GraphModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
