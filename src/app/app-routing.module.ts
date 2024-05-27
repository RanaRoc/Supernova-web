import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { FormComponent } from './components/form/form.component';
import { FiltreComponent } from './components/filtre/filtre.component';
const routes: Routes = [
  { path: 'form', component: FormComponent },
  { path: 'accueil', component: AccueilComponent},
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
{ path: 'filtre', component: FiltreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
