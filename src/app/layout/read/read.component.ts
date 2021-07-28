import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadComponent {

  public readOnlyFileName: string = '';
  public readOnlyFileNameContent: string = '';

  constructor(private httpService: HttpService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {}

  public readOnlyFile(): void {
    this.httpService.post('readFile', this.readOnlyFileName).subscribe((data: any) => {
      this.readOnlyFileNameContent = data.content;
      this.changeDetector.detectChanges();
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' открыт для чтения');
      this.notificationService.clearNotification();
    });
  }
}
