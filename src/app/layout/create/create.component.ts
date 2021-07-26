import { Component, EventEmitter, Output} from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {

  @Output() notification = new EventEmitter<string>();

  public createFileName: string = '';

  set fileList(list: string) {
    this.fileService.filesList = list;
  }

  constructor(private httpService: HttpService,
              private fileService: FileService) {}

  public createFile(): void {
    this.httpService.post('createFile', this.createFileName).subscribe((data: any) => {
      this.notification.emit('Файл с наименованием ' + data + ' создан');
    });

    this.fileService.getFilesLists().subscribe((data: string) => {
      this.fileList = data;
    });
  }

}
