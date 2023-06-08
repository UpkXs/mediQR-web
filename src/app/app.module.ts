import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import {HttpClientModule} from "@angular/common/http";
import { QueuePageComponent } from './queue-page/queue-page.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {FormsModule} from "@angular/forms";
import { OverlayComponent } from './overlay/overlay.component';
import { DoctorsRoomComponent } from './doctors-room/doctors-room.component';
import { CallNextOverlayComponent } from './call-next-overlay/call-next-overlay.component';
import { YourTurnOverlayComponent } from './your-turn-overlay/your-turn-overlay.component';
import { CallByNumberComponent } from './call-by-number/call-by-number.component';
import { RemoveVisitorsComponent } from './remove-visitors/remove-visitors.component';
import { LogoutPageComponent } from './logout-page/logout-page.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { DonePageComponent } from './done-page/done-page.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    QueuePageComponent,
    ProgressBarComponent,
    OverlayComponent,
    DoctorsRoomComponent,
    CallNextOverlayComponent,
    YourTurnOverlayComponent,
    CallByNumberComponent,
    RemoveVisitorsComponent,
    LogoutPageComponent,
    AdminPanelComponent,
    DonePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
