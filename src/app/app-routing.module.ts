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
const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'accueil', component: AccueilComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
{ path: 'filtre', component: FiltreComponent },
{ path: 'login', component: LoginComponent },
{ path: 'users', component: UserListComponent },
{ path: 'wishlist', component: WishlistComponent },
{ path: 'projects',component: ProjectListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
