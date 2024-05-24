import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class DeviceService {
  public static get isDesktop() {
    return window.innerWidth >= 640;
  }
}
