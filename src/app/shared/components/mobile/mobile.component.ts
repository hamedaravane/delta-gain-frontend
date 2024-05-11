import {Component} from '@angular/core';

@Component({
  selector: 'mobile',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './mobile.component.scss'
})
export class MobileComponent {

}
