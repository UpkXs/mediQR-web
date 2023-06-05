import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {generateRandomString} from "../utils/GenerateRandomString";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mediQR-web';
  role: string = 'patient' //todo aro 81KKrWiK when QR
  verificationCode: string //todo aro Np7q0Gqe when QR

  constructor(
    private readonly router: Router,
  ) {
  }

  ngOnInit() {
    this.verificationCode = generateRandomString(5);
    console.log('s21ggvME :: this.verificationCode : ', this.verificationCode);

    if (this.role === 'patient') {
      this.router.navigate(['/welcome-page', this.verificationCode]).then();
    } else if (this.role === 'admin') {
      this.router.navigate(['/doctors-room', this.verificationCode]).then();
    }
  }
}
