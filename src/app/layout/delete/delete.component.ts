import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteComponent implements OnDestroy {

  public deleteFileName: string = '';

  private destroyStream$: Subject<any> = new Subject();

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {}

  public deleteFile(): void {
    this.httpService.post('deleteFile', this.deleteFileName).pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' удален');
      this.changeDetector.detectChanges();
      this.notificationService.clearNotification();
    });

    this.fileService.getFilesLists().pipe(takeUntil(this.destroyStream$)).subscribe((data: string) => {
      this.fileService.filesList$.next(data);
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }

}
