import { Component, EventEmitter, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {

  @Output() notification = new EventEmitter<string>();

  public readFileName: string = '';
  public updateFileNameContent: string = '';

  constructor(private httpService: HttpService) {}

  public readFile(): void {
    this.httpService.post('readFile', this.readFileName).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notification.emit('Файл с наименованием ' + data.fileName + ' открыт для чтения и редактирования');
    });
  }

  public updateFile(): void {
    this.httpService.post('updateFile', this.readFileName, this.updateFileNameContent).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notification.emit('Файл с наименованием ' + data.fileName + ' сохранен');
    });
  }

}
