import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crud';
  arr=[1,3,5,2,6,8,10,25,47,48];
  date=new Date();
  b = 1.3495;
}
