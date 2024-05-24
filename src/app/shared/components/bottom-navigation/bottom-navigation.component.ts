import {Component} from '@angular/core';
import {NzGridModule} from "ng-zorro-antd/grid";
import menu from "@shared/constant/menu.constant";
import {NzButtonModule} from "ng-zorro-antd/button";
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [NzGridModule, NzButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './bottom-navigation.component.html',
  styleUrl: './bottom-navigation.component.scss'
})
export class BottomNavigationComponent {

  protected readonly menu = menu;
}
