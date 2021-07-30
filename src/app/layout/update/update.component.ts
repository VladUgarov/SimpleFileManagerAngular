import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {NotificationService} from "../../services/notification.service";
import {Subject } from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateComponent implements OnDestroy {

  public readFileName: string = '';
  public updateFileNameContent: string = '';


  private notifier: Subject<any> = new Subject();


  constructor(private httpService: HttpService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {
  }

  public readFile(): void {
    this.httpService.post('readFile', this.readFileName).pipe(takeUntil(this.notifier)).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.changeDetector.detectChanges();
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' открыт для чтения и редактирования');
      this.notificationService.clearNotification();
    });
  }

  public updateFile(): void {
    this.httpService.post('updateFile', this.readFileName, this.updateFileNameContent)
      .pipe(takeUntil(this.notifier)).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' сохранен');
      this.notificationService.clearNotification();
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

}
