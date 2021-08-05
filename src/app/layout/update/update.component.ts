import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateComponent implements OnDestroy, OnInit {
  public updateFileForm!: FormGroup;

  public readFileName: string = '';

  public updateFileNameContent: string = '';

  private destroyStream$: Subject<any> = new Subject();

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public readFile(): void {
    const formData = { ...this.updateFileForm.value };
    this.httpService.post('readFile', formData.updateFileName)
      .pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
        this.updateFileForm.patchValue({ updateFileNameContent: data.content });
        this.changeDetector.detectChanges();
        this.notificationService.notification$.next(`Файл с наименованием ${data.fileName} открыт для чтения и редактирования`);
        this.notificationService.clearNotification();
      });
  }

  public updateFile(): void {
    const formData = { ...this.updateFileForm.value };
    this.httpService.post('updateFile', formData.updateFileName, formData.updateFileNameContent)
      .pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
        this.updateFileForm.patchValue({ updateFileNameContent: data.content });
        this.notificationService.notification$.next(`Файл с наименованием ${data.fileName} сохранен`);
        this.notificationService.clearNotification();
      });
  }

  private initForms(): void {
    this.updateFileForm = new FormGroup({
      updateFileName: new FormControl('', Validators.required),
      updateFileNameContent: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.initForms();
  }

  ngOnDestroy(): void {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }
}
