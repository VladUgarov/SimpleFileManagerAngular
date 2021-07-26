import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  @Output() notification = new EventEmitter<string>();

  public deleteFileName: string = '';

  set fileList(list: string) {
    this.fileService.filesList = list;
  }

  constructor(private httpService: HttpService,
              private fileService: FileService) {}

  public deleteFile(): void {
    this.httpService.post('deleteFile', this.deleteFileName).subscribe((data: any) => {
      this.notification.emit('Файл с наименованием ' + data + ' удален');
    });

    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileList = data;
    });
  }

}
