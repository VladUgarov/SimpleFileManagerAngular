import { Component, EventEmitter, Output} from '@angular/core';
import { HttpService } from "../../services/http.service"

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss']
})
export class ReadComponent {

  @Output() notification = new EventEmitter<string>();

  public readOnlyFileName: string = '';
  public readOnlyFileNameContent: string = '';

  constructor(private httpService: HttpService){}

  public readOnlyFile(): void {
    this.httpService.post('readFile', this.readOnlyFileName).subscribe((data: any) => {
      this.readOnlyFileNameContent = data.content;
      this.notification.emit('Файл с наименованием ' + data.fileName + ' открыт для чтения');
    });
  }
}
