import {AfterViewInit, Component, OnDestroy, signal} from '@angular/core';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {RouterOutlet} from '@angular/router';
import {AsyncPipe, NgClass} from '@angular/common';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {Subscription} from 'rxjs';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {SliderMenuComponent} from "@shared/components/slider-menu/slider-menu.component";
import {DesktopComponent} from "@shared/components/desktop/desktop.component";
import {MobileComponent} from "@shared/components/mobile/mobile.component";
import {NzGridModule} from "ng-zorro-antd/grid";
import {BottomNavigationComponent} from "@shared/components/bottom-navigation/bottom-navigation.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzModalModule,
    NzFormModule,
    NzButtonModule,
    NzSpaceModule,
    NzInputModule,
    NzDividerModule,
    NzPageHeaderModule,
    NzGridModule,
    SliderMenuComponent,
    DesktopComponent,
    MobileComponent,
    BottomNavigationComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
  // ompfinexToken = new FormControl<string>('', [Validators.required]);
  tokenReaderSubscription = new Subscription();
  isSideMenuCollapsed = signal(true);
  pageTitle = signal('Home');
  // private readonly authFacade = inject(AuthFacade);
  // ompfinexAuthTokenSubmitLoading$ = this.authFacade.ompfinexAuthTokenSubmitLoading$;
  // isAuthTokenAvailable$ = this.authFacade.isAuthTokenAvailable$;

  ngAfterViewInit(): void {
    // this.authFacade.readTokenFromLocalStorage();
  }

  /*submitToken() {
    if (this.ompfinexToken.value) {
      this.authFacade.setOmpfinexAuthToken(this.ompfinexToken.value);
    }
  }*/

  ngOnDestroy() {
    this.tokenReaderSubscription.unsubscribe();
  }
}
