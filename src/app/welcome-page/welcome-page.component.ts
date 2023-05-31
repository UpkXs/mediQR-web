import { Component, OnInit } from '@angular/core';
import {SubSink} from "../../utils/SubSink";
import {WelcomePageController} from "../../controllers/WelcomePageController";
import {tap} from "rxjs";

@Component({
  selector: 'mediQR-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  isOpenPopover: boolean = false;
  reasonDisplayValue: string = 'Choose';

  reasonsMap: Map<string, string> = new Map<string, string>();

  private readonly subs = new SubSink();

  constructor(
    private readonly welcomePageController: WelcomePageController,
  ) { }

  ngOnInit(): void {
    this.reasonsMap.set('ZwyX8o5q', 'Doctor\'s appointment');
    this.reasonsMap.set('C5040S9R', 'Analyzes');
    this.reasonsMap.set('eFlLG84G', 'Ultrasound');
    this.reasonsMap.set('TnXcfF64', 'X-Ray');
    this.reasonsMap.set('4Ml0CyeY', 'Certificate of illness');
    this.reasonsMap.set('giDSXMz2', 'Sick leave');

    this.reasonsMap.forEach((map) => {
      console.log('O7PGJuKM :: map : ', map);
    })

    this.loadReasons();
  }

  openOrClosePopover() {
    console.log('rxZ3EZ1BSe :: this.isOpenPopover : before', this.isOpenPopover);
    this.isOpenPopover = !this.isOpenPopover;
    console.log('rxZ3EZ1BSe :: this.isOpenPopover : after', this.isOpenPopover);
  }

  loadReasons() {
    this.subs.sink = this.welcomePageController.loadReasons().pipe(
      tap((value) => {
        console.log('VE4C56C4hs :: value : ', value);
      })
    ).subscribe();
  }

}
