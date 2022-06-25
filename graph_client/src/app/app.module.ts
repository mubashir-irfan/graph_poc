import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { GraphModule } from './graph/graph.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    GraphModule,
    HttpClientModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
