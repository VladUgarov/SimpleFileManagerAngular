import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const BASE_API_URL: string = 'http://localhost:3000/api/';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) { }

  get(url: string): Observable<any> {
    return this.http.get(BASE_API_URL + url);
  }

  post(url: string, fileName: string, fileContent: string = ''): Observable<any> {
    switch (url) {
      case 'createFile':
        return this.http.post(BASE_API_URL + url, { fileName });
        break;
      case 'deleteFile':
        return this.http.post(BASE_API_URL + url, { fileName });
        break;
      case 'readFile':
        return this.http.post(BASE_API_URL + url, { fileName });
        break;
      case 'updateFile':
        return this.http.post(BASE_API_URL + url, { fileName, fileContent });
        break;
      default:
        return throwError('Ошибка в запросе');
    }
  }
}
