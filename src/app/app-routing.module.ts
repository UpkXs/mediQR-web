import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {QueuePageComponent} from "./queue-page/queue-page.component";
import {DoctorsRoomComponent} from "./doctors-room/doctors-room.component";

const routes: Routes = [
  { path: 'welcome-page', component: WelcomePageComponent},
  { path: 'queue-page/:queueId', component: QueuePageComponent},
  { path: 'doctors-room', component: DoctorsRoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
