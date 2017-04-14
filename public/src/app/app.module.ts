import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent }  from './app.component.js';


import { CommentService } from './app.service.js';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent],
  providers: [
      CommentService
  ],
})
export class AppModule { 
    
}
