import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateComponent} from "./layout/create/create.component";

const appRoutes: Routes = [
  { path: 'create', component: CreateComponent },
  // { path: 'create', loadChildren: () => import('./layout/create/create.module').then(m => m.CreateModule) },
  { path: 'delete', loadChildren: () => import('./layout/delete/delete.module').then(m => m.DeleteModule) },
  { path: 'read', loadChildren: () => import('./layout/read/read.module').then(m => m.ReadModule) },
  { path: 'update', loadChildren: () => import('./layout/update/update.module').then(m => m.UpdateModule) },
  { path: '**', redirectTo: '/create' },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],

})
export class AppRoutingModule { }
