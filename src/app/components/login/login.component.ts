import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private userService : UserService, private router: Router) { }

show1 = true;
show2 = false;
show3 = false;
show4 = false;
show5 = false;
show6 = false;
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
  this.router.navigate(['/users']);
}
login() {
  this.email = (document.querySelector('input[type="email"]') as HTMLInputElement).value;
  this.mdp = (document.querySelector('input[type="password"]') as HTMLInputElement).value;
  this.userService.checkIfUserExists(this.email, this.mdp).subscribe(
    (user) => {
      if (user) {
        if (user.Confirmed) {
          alert('Your account is confirmed, welcome!');
          this.router.navigate(['/accueil']);
        } else {
          alert('Your account is not confirmed yet, please check your email');
        }
      } else {
        alert('Invalid email or password');
      }
    },
    (error) => {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  );
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
      Confirmed: false
    };

  this.userService.addUser(newUser);

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
  }
}

