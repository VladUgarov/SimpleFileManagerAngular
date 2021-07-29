import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FileService} from '../../services/file.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllFilesComponent implements OnInit, OnDestroy  {

  public list$ = this.fileService.filesList$

  private subscriptions: Subscription[] = [];

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.subscriptions.push(
    this.fileService.getFilesLists().subscribe((data: any) => {
      this.fileService.filesList$.next(data);
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
