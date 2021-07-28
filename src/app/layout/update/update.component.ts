import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent {

  public readFileName: string = '';
  public updateFileNameContent: string = '';

  constructor(private httpService: HttpService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {
  }

  public readFile(): void {
    this.httpService.post('readFile', this.readFileName).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.changeDetector.detectChanges();
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' открыт для чтения и редактирования');
      this.notificationService.clearNotification();
    });
  }

  public updateFile(): void {
    this.httpService.post('updateFile', this.readFileName, this.updateFileNameContent).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' сохранен');
      this.notificationService.clearNotification();
    });
  }

}
