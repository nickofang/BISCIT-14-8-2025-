import { Component, OnInit } from '@angular/core';


@Component({ //this is the decorator and what i should imported at the top
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false, //important to do --standalone false, otherwise it will not work with the app.module.ts
})
export class AppComponent {
  constructor() {}
}
