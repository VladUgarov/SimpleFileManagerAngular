import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

const BASE_API_URL: string = 'http://localhost:3000/api/';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(BASE_API_URL + url);
  }

  post(url: string, fileName: string, fileContent: string = ''): Observable<any> {
    if(url === 'createFile') {
      return this.http.post(BASE_API_URL + url, { fileName });
    }
    else if(url === 'deleteFile') {
      return this.http.post(BASE_API_URL + url, { fileName });
    }
    else if(url === 'readFile') {
      return this.http.post(BASE_API_URL + url, { fileName });
    }
    else if(url === 'updateFile') {
      return this.http.post(BASE_API_URL + url, { fileName, fileContent });
    }
    return throwError('Ошибка в запросе');
  }
}
