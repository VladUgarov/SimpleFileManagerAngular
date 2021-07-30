import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";
import {Subject, Subscription} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent implements OnDestroy {

  public deleteFileName: string = '';

  private notifier: Subject<any> = new Subject();

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {}

  public deleteFile(): void {
    this.httpService.post('deleteFile', this.deleteFileName).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' удален');
      this.notificationService.clearNotification();
    });

    this.fileService.getFilesLists().pipe(takeUntil(this.notifier)).subscribe((data: string) => {
      this.fileService.filesList$.next(data);
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
