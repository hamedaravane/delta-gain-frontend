import {AfterViewInit, Component, DestroyRef, inject, OnDestroy, OnInit, signal} from '@angular/core';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgClass} from '@angular/common';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {Subscription} from 'rxjs';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzSpaceModule} from 'ng-zorro-antd/space';
import {NzPageHeaderModule} from 'ng-zorro-antd/page-header';
import {SideMenuComponent} from '@shared/components/side-menu/side-menu.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {BottomNavigationComponent} from '@shared/components/bottom-navigation/bottom-navigation.component';
import {AuthFacade} from '../authentication/auth.facade';
import {NzAutocompleteModule} from 'ng-zorro-antd/auto-complete';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {DeviceService} from "@shared/data-access/device.service";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, AsyncPipe, FormsModule, ReactiveFormsModule, NzLayoutModule, NzModalModule, NzFormModule, NzButtonModule, NzSpaceModule, NzInputModule, NzDividerModule, NzPageHeaderModule, NzGridModule, NzAutocompleteModule, SideMenuComponent, BottomNavigationComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  isDesktop = DeviceService.isDesktop;
  isSideMenuCollapsed = signal(true);
  pageTitle = signal('Dashboard');
  token = new FormControl<string>('', [Validators.required]);
  tokenReaderSubscription = new Subscription();
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly authFacade = inject(AuthFacade);
  isAuthTokenAvailable$ = this.authFacade.isAuthTokenAvailable$;
  ompfinexAuthTokenSubmitLoading$ = this.authFacade.authTokenSubmitLoading$;
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  ngOnInit() {
    this.pageTitle.set(this.activatedRoute.firstChild?.snapshot.data['title']);
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.pageTitle.set(this.activatedRoute.firstChild?.snapshot.data['title']);
    });
  }

  ngAfterViewInit() {
    this.authFacade.readTokenFromLocalStorage();
  }

  ngOnDestroy() {
    this.tokenReaderSubscription.unsubscribe();
  }

  submitToken() {
    if (this.token.value) {
      this.authFacade.setToken(this.token.value);
    }
  }
}
