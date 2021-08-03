import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notification$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public clearNotification() {
    setTimeout(() => {
      this.notification$.next('');
    }, 1500);
  }
}
