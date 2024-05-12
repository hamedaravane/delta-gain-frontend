import { Component, computed } from '@angular/core';
import screenWidth from '@shared/utility/screen';
import { NgIf } from '@angular/common';

@Component({
  selector: 'desktop',
  standalone: true,
  imports: [NgIf],
  template: `<ng-content *ngIf="screenWidthSignal()"></ng-content>`,
  styleUrl: 'desktop.component.scss'
})
export class DesktopComponent {
  screenWidthSignal  = computed(() => screenWidth > 641);
}
