import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get('localhost:3000/api/getAllFiles');
  }
}
