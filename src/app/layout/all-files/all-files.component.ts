import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllFilesComponent implements OnInit {

  public list$ = this.fileService.filesList$

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.getFilesLists().subscribe((data: any) => {
      this.fileService.filesList$.next(data);
    });
  }

}
