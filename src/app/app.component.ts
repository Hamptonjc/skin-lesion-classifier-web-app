import { Component } from '@angular/core';
import * as tf from '@tensorflow/tfjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarOpened: boolean = false;


  openLink(url: string) {
    window.open(url, "_blank");
  }
}
