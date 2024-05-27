import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor(private router: Router) {}


  goToForm() {
    this.router.navigate(['/form']);
  }
  goToFiltre(){
    this.router.navigate(['/filtre']);
  }

}
