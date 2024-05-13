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
  @Input() selectedProducts: any[];

  currentProduct?: Product;
  currentIndex = -1;
  filteredProducts: any[] = [];
  checkboxes: {[key: number]: boolean} = {};

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.filteredProducts = this.products;
    this.retrieveProducts();
    for (let i = 1; i <= 4; i++) {
      this.checkboxes[i] = false;
    }

  }
  applyFilter(combinaison: number) {
    const selectedCombinations = Object.keys(this.checkboxes).filter(key => this.checkboxes[key]);
    if (selectedCombinations.length === 0) {
      // If no checkboxes are selected, show all products
      this.filteredProducts = this.products;
    } else {
      // Filter products based on selected combinations
      this.filteredProducts = this.products.filter(product => selectedCombinations.includes(product.Cas.toString()));
    }
  }  refreshList(): void {
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
