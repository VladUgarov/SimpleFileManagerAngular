import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import {LayoutComponent} from "./layout/layout.component";
import { HttpService } from "./services/http.service";
import { HeaderComponent } from './layout/header/header.component';
import { ReadComponent } from './layout/read/read.component';
import { CreateComponent } from './layout/create/create.component';
import { DeleteComponent } from './layout/delete/delete.component';
import { UpdateComponent } from './layout/update/update.component';
import {RouterModule, Routes} from "@angular/router";
import {MatMenuModule} from '@angular/material/menu';


const appRoutes: Routes =[
  { path: 'create', component: CreateComponent},
  { path: 'delete', component: DeleteComponent},
  { path: 'read', component: ReadComponent},
  { path: 'update', component: UpdateComponent},
];

@NgModule({
  declarations: [
    LayoutComponent,
    AppComponent,
    HeaderComponent,
    ReadComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
