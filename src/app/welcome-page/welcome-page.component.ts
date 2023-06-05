import {Component, OnInit} from '@angular/core';
import {SubSink} from "../../utils/SubSink";
import {WelcomePageController} from "../../controllers/WelcomePageController";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'mediQR-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  verificationCode: string;

  isOpenPopover: boolean = false;
  reasonDisplayValue: string = 'Choose';

  reasonsMap: Map<string, string> = new Map<string, string>();

  private readonly subs = new SubSink();

  constructor(
    private readonly welcomePageController: WelcomePageController,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.verificationCode = params['verificationCode'];
    });
    this.loadReasons();
  }

  openOrClosePopover() {
    this.isOpenPopover = !this.isOpenPopover;
  }

  loadReasons() {
    this.subs.sink = this.welcomePageController.loadReasons()
      .pipe(
        tap((reasons) => {
          reasons.forEach((reason) => {
            this.reasonsMap.set(reason.id, reason.name);
          })
        })
      ).subscribe();
  }

  onChange(value: string) {
    this.reasonDisplayValue = value;
  }

  isReasonSelected(): boolean {
    return this.reasonDisplayValue !== 'Choose';
  }

  navigateNextPage() {
    this.router.navigate(['/queue-page', this.verificationCode, this.reasonDisplayValue]).then();
  }
}
