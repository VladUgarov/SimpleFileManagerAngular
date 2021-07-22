import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public response: string = '';

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    // this.httpService.getData().subscribe((data: any) => {
    //   this.response = data.filesList;
    // });
      const request = new XMLHttpRequest();
      request.open('GET', 'http://localhost:3000/api/getAllFiles', true);
      request.addEventListener('load', () => {
        const received = JSON.parse(request.response);
        if (request.status === 200) {
          this.response = received
        }
      });
      request.send();
  }
}
