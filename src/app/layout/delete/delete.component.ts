import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  public deleteFileName: string = '';

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService) {}

  public deleteFile(): void {
    this.httpService.post('deleteFile', this.deleteFileName).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' удален');
      this.notificationService.clearNotification();

    });

    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileService.filesList$.next(data);
    });
  }

}
