import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnDestroy{

  public createFileName: string = '';

  private subscriptions: Subscription[] = [];

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService) {}

  public createFile(): void {
    this.subscriptions.push(
    this.httpService.post('createFile', this.createFileName).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' создан')
      this.notificationService.clearNotification();
    }));

    this.subscriptions.push(
    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileService.filesList$.next(data);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
