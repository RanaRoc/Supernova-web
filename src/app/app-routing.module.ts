import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ResponsesListComponent } from './components/resp-form-list/resp-form-list.component';

import { FormComponent } from './components/form/form.component';
const routes: Routes = [
  { path: 'home', component: FormComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
{ path: 'responses', component: ResponsesListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
