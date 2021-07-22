import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit  {
  public filesList: string = '';
  public createFileName: string = '';
  public deleteFileName: string = '';
  public readOnlyFileName: string = '';
  public readOnlyFileNameContent: string = '';
  public readFileName: string = '';
  public updateFileNameContent: string = '';
  public notification: string = '';

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.getFilesLists();
  }

  createFile(): void {
    this.httpService.post('createFile', this.createFileName).subscribe((data: any) => {
        this.notification = 'Файл с наименованием ' + data + ' создан'
    });
    this.getFilesLists();
    this.clearNotification();
  }

  deleteFile(): void {
    this.httpService.post('deleteFile', this.deleteFileName).subscribe((data: any) => {
      this.notification = 'Файл с наименованием ' + data + ' удален';
    });
    this.getFilesLists();
    this.clearNotification();
  }

  readOnlyFile(): void {
    this.httpService.post('readFile', this.readOnlyFileName).subscribe((data: any) => {
      this.readOnlyFileNameContent = data.content;
      this.notification = 'Файл с наименованием ' + data.fileName + ' открыт для чтения';
    });
    this.getFilesLists();
    this.clearNotification();
  }

  readFile(): void {
    this.httpService.post('readFile', this.readFileName).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notification = 'Файл с наименованием ' + data.fileName + ' открыт для чтения и редактирования';
    });
    this.getFilesLists();
    this.clearNotification();
  }

  updateFile(): void {
    this.httpService.post('updateFile', this.readFileName, this.updateFileNameContent).subscribe((data: any) => {
      this.updateFileNameContent = data.content;
      this.notification = 'Файл с наименованием ' + data.fileName + ' сохранен';
    });
    this.getFilesLists();
    this.clearNotification();
  }

  getFilesLists() : void {
    this.httpService.get('getAllFiles').subscribe((data: any) => {
      this.filesList = data
    });
  }

  clearNotification() {
    setTimeout(() => {
      this.notification = ''
    }, 3000);
  }
}
