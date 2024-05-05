import { Component, Input, signal } from '@angular/core';
import menu from '@shared/components/slider-menu/menu.constant';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

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
  templateUrl: './slider-menu.component.html',
  styleUrl: './slider-menu.component.scss'
})
export class SliderMenuComponent {
  @Input() isCollapsed = false;
  menu = menu;
}
