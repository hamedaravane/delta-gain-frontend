import {Component, inject, OnInit} from '@angular/core';
import {
  NzContentComponent,
  NzFooterComponent,
  NzHeaderComponent,
  NzLayoutComponent,
  NzSiderComponent
} from "ng-zorro-antd/layout";
import {RouterOutlet} from "@angular/router";
import {AsyncPipe} from '@angular/common';
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {Subscription} from "rxjs";
import {LayoutFacade} from "@layout/layout.facade";

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
    NzButtonComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  private readonly layoutFacade = inject(LayoutFacade);
  isModalVisible = false;
  ompfinexToken = new FormControl<string>('', [Validators.required]);
  tokenReaderSubscription = new Subscription();
  ompfinexAuthTokenSubmitLoading$ = this.layoutFacade.ompfinexAuthTokenSubmitLoading$;

  ngOnInit(): void {
    this.layoutFacade.readTokenFromLocalStorage();
    this.tokenReaderSubscription = this.layoutFacade.ompfinexAuthToken$.subscribe(token => {
      if (token) {
        this.isModalVisible = false;
      } else if (!token || token.length < 1) {
        this.isModalVisible = true;
      }
    })
  }

  submitToken() {
    if (this.ompfinexToken.value) {
      this.layoutFacade.setOmpfinexAuthToken(this.ompfinexToken.value);
    }
  }
}
