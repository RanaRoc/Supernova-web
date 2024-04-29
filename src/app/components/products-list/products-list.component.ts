import { Component, OnInit,Input } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products?: Product[];
  currentProduct?: Product;
  currentIndex = -1;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  refreshList(): void {
    this.currentProduct = undefined;
    this.currentIndex = -1;
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({  key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.products = data;
    });
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProducts(): void {
    this.productService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
