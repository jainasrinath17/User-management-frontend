import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/create', loadChildren: () => import('./components/user-create/user-create.module').then(m => m.UserCreateModule) },
  { path: 'users/edit/:id', loadChildren: () => import('./components/user-edit/user-edit.module').then(m => m.UserEditModule) },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
