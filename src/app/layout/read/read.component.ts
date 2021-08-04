import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadComponent implements OnDestroy, OnInit {
  public readOnlyFileForm!: FormGroup;

  private destroyStream$: Subject<any> = new Subject();

  constructor(
    private httpService: HttpService,
    private notificationService: NotificationService,
    private changeDetector: ChangeDetectorRef,
  ) {}

  public readOnlyFile(): void {
    const formData = { ...this.readOnlyFileForm.value };
    this.httpService.post('readFile', formData.readOnlyFileName).pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.readOnlyFileForm.patchValue({ readOnlyFileNameContent: data.content });
      this.changeDetector.detectChanges();
      this.notificationService.notification$.next(`Файл с наименованием ${data.fileName} открыт для чтения`);
      this.notificationService.clearNotification();
    });
  }

  private initForms(): void {
    this.readOnlyFileForm = new FormGroup({
      readOnlyFileName: new FormControl('', Validators.required),
      readOnlyFileNameContent: new FormControl({
        value: '',
        disabled: true,
      }),
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
