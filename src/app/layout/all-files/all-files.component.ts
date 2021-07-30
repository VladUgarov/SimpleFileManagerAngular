import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FileService} from '../../services/file.service';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllFilesComponent implements OnInit, OnDestroy  {

  public list$ = this.fileService.filesList$

  constructor(private fileService: FileService) {}

  private destroyStream$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.fileService.getFilesLists().pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
      this.fileService.filesList$.next(data);
    });
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }

}
