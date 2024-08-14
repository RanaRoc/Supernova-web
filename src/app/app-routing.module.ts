import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormComponent } from './components/form/form.component';
import { FiltreComponent } from './components/filtre/filtre.component';
import { LoginComponent } from './components/login/login.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
const routes: Routes = [
  { path: 'form', component: FormComponent, canActivate: [AuthGuard] },
  { path: 'accueil', component: AccueilComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent, canActivate: [AuthGuard] },
{ path: 'filtre', component: FiltreComponent, canActivate: [AuthGuard] },
{ path: 'login', component: LoginComponent },
{ path: 'users', component: UserListComponent, canActivate: [AdminGuard] },
{ path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
{ path: 'projects',component: ProjectListComponent, canActivate: [AuthGuard]},
{ path: 'file-upload',component: FileUploadComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
