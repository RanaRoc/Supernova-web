import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { ResponseService } from './services/response.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Supernova';
  sheetData: any; // Assuming your sheet data is of any type, adjust as needed

  constructor(
    private productService: ProductService,
    private responseService: ResponseService
  ) {}

  sendEmail() {
    document.getElementById('emailForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const subject = (document.getElementById('subject') as HTMLInputElement).value;
      const body = (document.getElementById('body') as HTMLInputElement).value;
      console.log("trying to send email");



      try {
        const response = await fetch('http://localhost:3000/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, subject, body }),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          alert(result.error);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending the email');
      }
    });
  }
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

