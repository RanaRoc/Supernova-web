import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  @Input() product?: Product;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentProduct: Product = {
    Identifiant: '',
    Marque: '',
    Modele: '',
    Type: '',
    Finition: '',
    Puissance: '',
    Temperature_de_couleur: '',
    Forme: '',
    Faisceau: '',
    Photo_luminaire: '',
    Photo_projet: '',
    Description: ''
  };
  message = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentProduct = { ...this.product };
  }
}
