import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {QueuePageComponent} from "./queue-page/queue-page.component";
import {DoctorsRoomComponent} from "./doctors-room/doctors-room.component";
import {LogoutPageComponent} from "./logout-page/logout-page.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import {DonePageComponent} from "./done-page/done-page.component";
import {PosterPageComponent} from "./poster-page/poster-page.component";

const routes: Routes = [
  { path: 'welcome-page', component: WelcomePageComponent},
  { path: 'queue-page/:queueId', component: QueuePageComponent},
  { path: 'doctors-room/:verificationCode', component: DoctorsRoomComponent},
  { path: 'logout-page', component: LogoutPageComponent},
  { path: 'admin-panel', component: AdminPanelComponent},
  { path: 'done-page', component: DonePageComponent},
  { path: 'poster-page', component: PosterPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
