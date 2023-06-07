import {Component, OnInit} from '@angular/core';

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
  ) {
  }

  ngOnInit() {
  }
}
