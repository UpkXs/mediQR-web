import {Component, OnInit} from '@angular/core';
import {SubSink} from "../../utils/SubSink";
import {WelcomePageController} from "../../controllers/WelcomePageController";
import {Router} from "@angular/router";

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
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loadReasons();
  }

  openOrClosePopover() {
    this.isOpenPopover = !this.isOpenPopover;
  }

  loadReasons() {
    // this.subs.sink = this.welcomePageController.loadReasons().pipe(  // todo aro fLaid8J4GN change after server included
    //   tap((reasons) => {
    //     reasons.forEach((reason) => {
    //       console.log('Z61KPBxxZm :: reason : ', reason);
    //       this.reasonsMap.set(reason.id, reason.name);
    //     })
    //   }),
    //   tap(() => {
    //     this.reasonsMap.forEach((reason) => {
    //       console.log('L4bmMG88I8 :: reason : ', reason);
    //     })
    //   })
    // ).subscribe();

    this.welcomePageController.loadReasons().forEach((reason) => { // todo aro 4I5EfE2RHm change after server included
      console.log('D9a81ru3VW :: reason : ', reason);
      this.reasonsMap.set(reason.id, reason.name);
    });

    this.reasonsMap.forEach((reason) => {
      console.log('PoL6gm1q1d :: reason : ', reason);
    });
  }

  onChange(value: string) {
    this.reasonDisplayValue = value;
  }

  isReasonSelected(): boolean {
    return this.reasonDisplayValue !== 'Choose';
  }

  navigateNextPage() {
    this.router.navigate(['/res', this.reasonDisplayValue]).then();
  }
}
