import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

  public notification$ = this.notificationService.notification$;

  constructor(private notificationService: NotificationService) {}

}
