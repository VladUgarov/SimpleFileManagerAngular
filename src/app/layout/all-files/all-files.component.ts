import { Component, OnInit } from '@angular/core';
import {FileService} from "../../services/file.service";

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.scss']
})
export class AllFilesComponent implements OnInit {

  get fileList(): string {
    return this.fileService.filesList;
  }

  set changeFileList(list: string) {
    this.fileService.filesList = list;
  }

  constructor(private fileService: FileService){}

  ngOnInit(): void {
    this.fileService.getFilesLists().subscribe((data: any) => {
      this.changeFileList = data;
    });
  }

}
