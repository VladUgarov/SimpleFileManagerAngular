import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import {NotificationService} from "../../services/notification.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";



@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnDestroy{

  public createFileName: string = '';

  private destroyStream$: Subject<any> = new Subject();

  set fileList(list: string) {
    this.fileService.filesList$.next(list);
  }

  constructor(private httpService: HttpService,
              private fileService: FileService,
              private notificationService: NotificationService) {}

  public createFile(): void {
    this.httpService.post('createFile', this.createFileName).pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.notificationService.notification$.next('Файл с наименованием ' + data + ' создан')
      this.notificationService.clearNotification();
    });

    this.fileService.getFilesLists().pipe(takeUntil(this.destroyStream$)).subscribe((data: string) => {
      this.fileService.filesList$.next(data);
    });
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }

}
