import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mediQR-web';

  constructor(
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    console.log('oiUnx1WGl5 :: app-root : started')
    this.router.navigate(['/welcome-page']).then();
    console.log('mg2RCmZ38B :: app-root : finished')
  }
}
