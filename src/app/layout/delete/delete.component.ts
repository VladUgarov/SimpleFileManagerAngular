import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteComponent implements OnDestroy, OnInit {
  public deleteFileForm!: FormGroup;

  private destroyStream$: Subject<any> = new Subject();

  constructor(
    private httpService: HttpService,
    private fileService: FileService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public deleteFile(): void {
    const formData = { ...this.deleteFileForm.value };
    this.httpService.post('deleteFile', formData.deleteFileName)
      .pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
        this.changeDetector.detectChanges();
        this.notificationService.notification$.next(`Файл с наименованием ${data} удален`);
        this.notificationService.clearNotification();
      });

    this.fileService.getFilesLists()
      .pipe(takeUntil(this.destroyStream$)).subscribe((data: string) => {
        this.changeDetector.detectChanges();
        this.fileService.filesList$.next(data);
      });
  }

  private initForms(): void {
    this.deleteFileForm = new FormGroup({
      deleteFileName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.initForms();
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }
}
