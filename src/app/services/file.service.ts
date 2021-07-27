import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { HttpService } from "./http.service";

const GET_ALL_FILES = 'getAllFiles';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  public filesList$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpService: HttpService) {}

  public getFilesLists(): Observable<any> {
    return this.httpService.get(GET_ALL_FILES);
  }
}
