import {
  AfterViewInit,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal
} from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {AsyncPipe} from '@angular/common';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import { map, Subscription } from 'rxjs';
import { NzPageHeaderComponent, NzPageHeaderTitleDirective } from 'ng-zorro-antd/page-header';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { SliderMenuComponent } from '@shared/components/slider-menu/slider-menu.component';
import { NzSpaceComponent } from 'ng-zorro-antd/space';
import { AuthFacade } from '../authentication/auth.facade';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    NzLayoutComponent,
    NzSiderComponent,
    NzHeaderComponent,
    NzContentComponent,
    NzFooterComponent,
    RouterOutlet,
    AsyncPipe,
    NzModalModule,
    FormsModule,
    NzInputDirective,
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzFormLabelComponent,
    ReactiveFormsModule,
    NzButtonComponent,
    NzPageHeaderComponent,
    NzPageHeaderTitleDirective,
    NzDividerComponent,
    SliderMenuComponent,
    NzSpaceComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy, AfterViewInit {
  private readonly authFacade = inject(AuthFacade);
  private readonly activeRoute = inject(ActivatedRoute);
  ompfinexToken = new FormControl<string>('', [Validators.required]);
  tokenReaderSubscription = new Subscription();
  ompfinexAuthTokenSubmitLoading$ = this.authFacade.ompfinexAuthTokenSubmitLoading$;
  isAuthTokenAvailable$ = this.authFacade.isAuthTokenAvailable$;
  isSideMenuCollapsed = signal(false);
  pageTitle = signal('Home')

  ngAfterViewInit(): void {
    this.authFacade.readTokenFromLocalStorage();
  }

  toggleCollapsed() {
    this.isSideMenuCollapsed.update(collapsed => !collapsed);
  }

  submitToken() {
    if (this.ompfinexToken.value) {
      this.authFacade.setOmpfinexAuthToken(this.ompfinexToken.value);
    }
  }

  ngOnDestroy() {
    this.tokenReaderSubscription.unsubscribe();
  }
}
