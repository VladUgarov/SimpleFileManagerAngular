import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpService } from "./http.service";

const GET_ALL_FILES = 'getAllFiles';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public filesList: string = '';

  constructor(private httpService: HttpService) {}

  public getFilesLists(): Observable<any> {
    return this.httpService.get(GET_ALL_FILES);
  }
}
