import { Component, computed, signal } from '@angular/core';
import screenWidth from '@shared/utility/screen';
import { NgIf } from '@angular/common';

@Component({
  selector: 'mobile',
  standalone: true,
  imports: [NgIf],
  template: `<ng-content *ngIf="screenWidthSignal()"></ng-content>`,
  styleUrl: 'mobile.component.scss'
})
export class MobileComponent {
  screenWidthSignal  = computed(() => screenWidth < 640);
}
