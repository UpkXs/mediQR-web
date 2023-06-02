import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {HttpClientModule} from "@angular/common/http";
import { QueuePageComponent } from './queue-page/queue-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    QueuePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
