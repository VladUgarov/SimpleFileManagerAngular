import {Component} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  public notification: string = '';

  public notificationEvent(data: string): void {
    this.notification = data;
    this.clearNotification();
  }

  private clearNotification() {
    setTimeout(() => {
      this.notification = ''
    }, 3000);
  }
}
