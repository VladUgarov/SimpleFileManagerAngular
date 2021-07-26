import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HttpService } from "./services/http.service";
import { AllFilesComponent } from './layout/all-files/all-files.component';
import { ReadComponent } from './layout/read/read.component';
import { CreateComponent } from './layout/create/create.component';
import { DeleteComponent } from './layout/delete/delete.component';
import { UpdateComponent } from './layout/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AllFilesComponent,
    ReadComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
