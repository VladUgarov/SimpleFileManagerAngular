import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public list$ = this.fileService.filesList$;

  constructor(private fileService: FileService,
    private router: Router) {}

  private destroyStream$: Subject<any> = new Subject();

  ngOnInit(): void {
    this.fileService.getFilesLists()
      .pipe(takeUntil(this.destroyStream$)).subscribe((data: any) => {
        this.fileService.filesList$.next(data);
      });
  }

  ngOnDestroy() {
    this.destroyStream$.next();
    this.destroyStream$.complete();
  }

  navigateTo(url:string) {
    this.router.navigateByUrl(url);
  }
}
