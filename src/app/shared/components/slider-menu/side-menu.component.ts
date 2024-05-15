import {Component} from '@angular/core';
import menu from '@shared/constant/menu.constant';
import {NzMenuDirective, NzMenuItemComponent} from 'ng-zorro-antd/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzTooltipDirective} from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-slider-menu',
  standalone: true,
  imports: [
    NzMenuDirective,
    NzMenuItemComponent,
    RouterLinkActive,
    RouterLink,
    NzButtonComponent,
    NzTooltipDirective
  ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  menu = menu;
}
