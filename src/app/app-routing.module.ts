import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {QueuePageComponent} from "./queue-page/queue-page.component";
import {DoctorsRoomComponent} from "./doctors-room/doctors-room.component";

const routes: Routes = [
  { path: 'welcome-page/:verificationCode', component: WelcomePageComponent},
  { path: 'queue-page/:verificationCode/:reason', component: QueuePageComponent},
  { path: 'doctors-room/:verificationCode', component: DoctorsRoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
