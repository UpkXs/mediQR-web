import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./welcome-page/welcome-page.component";
import {QueuePageComponent} from "./queue-page/queue-page.component";

const routes: Routes = [
  { path: 'welcome-page', component: WelcomePageComponent},
  { path: 'queue-page/:reason', component: QueuePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
