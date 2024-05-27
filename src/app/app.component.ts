import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ResponseService } from './services/response.service';
import { GoogleSheetsService } from './services/google-sheets.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Supernova';
  sheetData: any; // Assuming your sheet data is of any type, adjust as needed

  constructor(
    private googleSheetsService: GoogleSheetsService,
    private productService: ProductService,
    private responseService: ResponseService
  ) {}

  async ngOnInit() {
    //this.googleSheetsService.fetchDataFromGoogleSheet();
  }

  /*fetchDataFromGoogleSheet() {
    this.googleSheetsService.fetchDataFromGoogleSheet().then(data => {
      // Assuming you want to store the fetched data somewhere
      this.sheetData = data;
      console.log('Fetched data:', this.sheetData);

      // Assuming you want to save the fetched responses and products to Firebase Realtime Database
      this.saveProductsToFirebase(data.products);
      this.saveResponsesToFirebase(data.responses);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  saveResponsesToFirebase(responses: any[]) {
    // Add your logic to save responses to Firebase Realtime Database
    this.responseService.saveResponsesToFirebase(responses);
  }

  saveProductsToFirebase(products: any[]) {
    this.productService.saveProductsToFirebase(products);

  }*/
}

