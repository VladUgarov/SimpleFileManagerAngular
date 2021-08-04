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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnDestroy, OnInit {
  public createFileForm!: FormGroup;

  private destroyStream$: Subject<any> = new Subject();

  constructor(
    private httpService: HttpService,
    private fileService: FileService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public createFile(): void {
    const formData = { ...this.createFileForm.value };
    this.httpService.post('createFile', formData.createFileName).pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.notificationService.notification$.next(`Файл с наименованием ${data} создан`);
      this.changeDetector.detectChanges();
      this.notificationService.clearNotification();
    });

    this.fileService.getFilesLists().pipe(takeUntil(this.destroyStream$)).subscribe((data: string) => {
      this.fileService.filesList$.next(data);
      this.changeDetector.detectChanges();
    });
  }

  private initForms(): void {
    this.createFileForm = new FormGroup({
      createFileName: new FormControl('', Validators.required),
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
