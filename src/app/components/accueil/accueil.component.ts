import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  constructor(private router: Router, private userService: UserService,private auth: AngularFireAuth) {}
  user: User;
  fullName = '';
  ngOnInit(): void {
    this.user = this.userService.user;
    console.log(this.user);
    if(this.user!=null){
      this.fullName = this.user.Prenom + " " + this.user.Nom;
      const nameElement = document.getElementById('name');
      if (nameElement) {
        nameElement.textContent = this.fullName;
      }
      console.log(this.user);


    console.log(this.user);
  }
  /// birthday petbeds minicity 2022
  }
  goToForm() {
    this.router.navigate(['/form']);
  }
  goToFiltre(){
    this.router.navigate(['/filtre']);
  }
  goToAccueil(){
    this.router.navigate(['/accueil']);
  }
  goToWishlist(){
    this.router.navigate(['/wishlist']);
  }
  goToLogin(){
    this.auth.signOut();
    this.router.navigate(['/login']);
  }
  goToProjects(){
    this.router.navigate(['/projects']);
  }
}
