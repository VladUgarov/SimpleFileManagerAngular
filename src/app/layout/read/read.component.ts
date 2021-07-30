import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HttpService } from '../../services/http.service';
import {NotificationService} from "../../services/notification.service";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadComponent implements OnDestroy{

  public readOnlyFileName: string = '';
  public readOnlyFileNameContent: string = '';

  private notifier: Subject<any> = new Subject();

  constructor(private httpService: HttpService,
              private notificationService: NotificationService,
              private changeDetector: ChangeDetectorRef) {}

  public readOnlyFile(): void {
    this.httpService.post('readFile', this.readOnlyFileName).pipe(takeUntil(this.notifier)).subscribe((data: any) => {
      this.readOnlyFileNameContent = data.content;
      this.changeDetector.detectChanges();
      this.notificationService.notification$.next('Файл с наименованием ' + data.fileName + ' открыт для чтения');
      this.notificationService.clearNotification();
    });
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
