import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent {

  public createFileName: string = '';

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService) {}

  public createFile(): void {
    this.httpService.post('createFile', this.createFileName).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' создан')
      this.notificationService.clearNotification()
    });

    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileService.filesList$.next(data);
    });
  }

}
