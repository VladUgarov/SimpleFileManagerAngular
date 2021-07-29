import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent implements OnDestroy {

  public deleteFileName: string = '';

  private subscriptions: Subscription[] = [];

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {}

  public deleteFile(): void {
    this.subscriptions.push(
    this.httpService.post('deleteFile', this.deleteFileName).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' удален');
      this.notificationService.clearNotification();
    }));

    this.subscriptions.push(
    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileService.filesList$.next(data);
      this.changeDetector.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
