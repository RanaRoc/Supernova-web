import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  constructor(private router: Router, private userService: UserService) {}
  user: Observable<User> | null = null;
  fullName = '';
  ngOnInit(): void {
    this.user = this.userService.user;
    if(this.user!=null){
    this.user.subscribe((data) => {
      this.fullName = data.Prenom + " " + data.Nom;
      const nameElement = document.getElementById('name');
      if (nameElement) {
        nameElement.textContent = this.fullName;
      }
      console.log(data);

    });
  }
  }
  goToForm() {
    this.router.navigate(['/form']);
  }
  goToFiltre(){
    this.router.navigate(['/filtre']);
  }

}
