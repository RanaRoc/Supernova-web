import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  registrationForm: FormGroup;
  isAuthenticated: boolean = false;


  constructor( private userService : UserService, private router: Router,private auth: AngularFireAuth) { }
  ngOnInit(): void {
    this.auth.authState.subscribe(user => {
      this.isAuthenticated = !!user;
    });
    if(this.isAuthenticated){
    this.router.navigate(['/accueil']);
    }

  }

show1 = true;
show2 = false;
show3 = false;
show4 = false;
show5 = false;
show6 = false;
show7 = false;
nom = '';
prenom = '';
email = '';
numtel = '';
nomAg = '';
mdp = '';
next1() {
  this.show1 = !this.show1;
  this.show2 = !this.show2;
}
next2(){
  this.show2 = !this.show2;
  this.show3 = !this.show3;
}
next3(){
  this.show3 = !this.show3;
  this.show6 = !this.show4;
}
next4(){
  this.show4 = !this.show4;
  this.show6 = !this.show6;
}
next6(){
  this.show6 = !this.show6;
  this.show7 = !this.show7;
}
user: User | null = null;
async login() {
  this.email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
  this.mdp = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

  await this.auth.signInWithEmailAndPassword(this.email, this.mdp);
  this.isAuthenticated = !!this.auth.currentUser;
 console.log(this.isAuthenticated);
    if(this.isAuthenticated) {
      console.log("email " + this.email);
      console.log("mdp " + this.mdp);
      this.user = this.userService.checkIfUserExists(this.email,this.mdp);
      console.log("user" + this.user);
      this.userService.user = this.user;

      console.log("user service user" + this.userService.user);
        //if(this.user.Confirmed)
        //  this.router.navigate(['/accueil']);
        this.router.navigate(['/accueil']);
    }
}
loginA() {
  const email = (document.querySelector('input[type="nom"]') as HTMLInputElement).value;
  const password = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

  if (email === 'haitam' && password === 'supernova123') {
    localStorage.setItem('isAdmin', 'true'); // Store a flag in localStorage
    this.router.navigate(['/users']); // Navigate to the admin route
  } else {
    alert('Invalid email or password');
  }
}


signin(){
  this.show4 = !this.show4;
  this.show5 = !this.show5;
}



async signup(){
  this.show5 = !this.show5;
     this.nom = (document.querySelector('input[type="nom"]') as HTMLInputElement).value;
     this.prenom = (document.querySelector('input[type="prenom"]') as HTMLInputElement).value;
    this.email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
    this.numtel = (document.querySelector('input[type="numtel"]') as HTMLInputElement).value;
    this.nomAg = (document.querySelector('input[type="nomAg"]') as HTMLInputElement).value;
    this.mdp = (document.querySelector('input[type="password"]') as HTMLInputElement).value;

    const newUser: User = {
      Nom: this.nom,
      Prenom: this.prenom,
      Email: this.email,
      NumTel: this.numtel,
      NomAg: this.nomAg,
      Mdp: this.mdp,
      Confirmed: false,
      Projects: []
    };

  this.userService.addUser(newUser);
  this.auth.createUserWithEmailAndPassword(this.email, this.mdp).then(
    response => {
      console.log(response);
    }
  )

    try {
      const response = await fetch('http://localhost:3000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, nom: this.nom,
          prenom: this.prenom }),
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
    try {
      const response = await fetch('http://localhost:3000/api/send-email-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.email, nom: this.nom,
          prenom: this.prenom }),
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

  }
}

