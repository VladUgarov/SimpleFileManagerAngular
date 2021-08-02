import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import {LayoutComponent} from "./layout/layout.component";
import { HttpService } from "./services/http.service";
import { HeaderComponent } from './layout/header/header.component';
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  { path: 'create',  loadChildren: () => import('./layout/create/create.module').then(m => m.CreateModule)},
  { path: 'delete', loadChildren: () => import('./layout/delete/delete.module').then(m => m.DeleteModule)},
  { path: 'read', loadChildren: () => import('./layout/read/read.module').then(m => m.ReadModule)},
  { path: 'update', loadChildren: () => import('./layout/update/update.module').then(m => m.UpdateModule)},
];

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
  ],
  exports: [RouterModule],
  providers: [HttpService],
  bootstrap: [AppComponent]
},)
export class AppModule {}
