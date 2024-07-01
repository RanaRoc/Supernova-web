import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { map } from 'rxjs';
import { ResponseService } from '../../services/response.service';
import { UserService } from '../../services/user.service';
import { Renderer2 } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-filtre',
  templateUrl: './filtre.component.html',
  styleUrl: './filtre.component.css'
})
export class FiltreComponent {
  user = null;
  fullName = '';
  constructor(private productService: ProductService, private responseService: ResponseService, private userService: UserService, private router : Router) {}

  Segments: { value: string, label: string, image: string, alt: string }[] = [
    { value: 'Résidentiel', label: 'Résidentiel', image: 'assets/images/résidentielle.jpg', alt: 'Image 1' },
    { value: 'education', label: 'Education', image: 'assets/images/education.jpg', alt: 'Image 2' },
    { value: 'tertaire', label: 'Tertiaire', image: 'assets/images/tertaire.jpg', alt: 'Image 3' },
    { value: 'hotellerie', label: 'Hôtellerie & bien être', image: 'assets/images/hotelerie.jpg', alt: 'Image 4' },
    { value: 'shop', label: 'Shop & retail', image: 'assets/images/shop&retail.jpg', alt: 'Image 5' },
    { value: 'art', label: 'Art & culture', image: 'assets/images/art.jpg', alt: 'Image 6' },
    { value: 'medical', label: 'Médical & centre de soins', image: 'assets/images/hopital.jpg', alt: 'Image 6' },
    { value: 'infrastructure', label: 'Infrastructures', image: 'assets/images/infrastructure.jpg', alt: 'Image 6' },
    { value: 'industriel', label: 'Locaux techniques et industriels', image: 'assets/images/industriel.jpg', alt: 'Image 6' },
    { value: 'sportif', label: 'Sportif', image: 'assets/images/sportif.jpg', alt: 'Image 6' },
    { value: 'parc', label: 'Parcs & milieux urbains', image: 'assets/images/parc.jpg', alt: 'Image 6' }

  ];
  types: { [segment: string]: { value: string, label: string, image: string, alt: string }[] } = {
    'Résidentiel': [
      { value: 'Chateau', label: 'Chateau', image: 'assets/images/chateau.jpeg', alt: 'Type 1 Alt 1' },
      { value: 'Appartement', label: 'Appartement', image: 'assets/images/appartement.jpg', alt: 'Type 1 Alt 2' },
      { value: 'Chalet', label: 'Châlet en montagne', image: 'assets/images/chalet.jpg', alt: 'Type 1 Alt 2' },
      { value: 'Villa', label: 'Villa', image: 'assets/images/villa.jpg', alt: 'Type 1 Alt 2' },
      { value: 'Maison', label: 'Maison individuelle', image: 'assets/images/maison.jpg', alt: 'Type 1 Alt 3' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'tertaire': [
      { value: 'tour', label: 'Tour', image: 'assets/images/tour.jpg', alt: 'Type 1 Alt 1' },
      { value: 'siege', label: 'Siège social', image: 'assets/images/siege.jpg', alt: 'Type 1 Alt 2' },
      { value: 'agence', label: 'Agence', image: 'assets/images/agence.jpeg', alt: 'Type 1 Alt 2' },
      { value: 'administration', label: 'Administration', image: 'assets/images/administration.png', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'shop': [
      { value: 'centreC', label: 'Centre commercial', image: 'assets/images/centre.jpg', alt: 'Type 1 Alt 1' },
      { value: 'distribution', label: 'Grandes distribution', image: 'assets/images/distribution.jpg', alt: 'Type 1 Alt 2' },
      { value: 'boutique', label: 'Boutique et petit commerce', image: 'assets/images/boutique.jpg', alt: 'Type 1 Alt 2' },
      { value: 'grand', label: 'Grand magasin', image: 'assets/images/magasin.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'education': [
      { value: 'ecole', label: 'Ecole/collège/lycée', image: 'assets/images/ecole.jpg', alt: 'Type 1 Alt 1' },
      { value: 'campus', label: 'Campus universitaire', image: 'assets/images/campus.jpg', alt: 'Type 1 Alt 2' },
      { value: 'bibliotheque', label: 'Bibliothèque', image: 'assets/images/biblio.jpg', alt: 'Type 1 Alt 2' },
      { value: 'centreR', label: 'Centre de recherche', image: 'assets/images/centreR.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'hotellerie': [
      { value: 'hotel', label: 'Hôtel', image: 'assets/images/hotel.jpg', alt: 'Type 1 Alt 1' },
      { value: 'restaurant', label: 'Restaurant / Bar / Café', image: 'assets/images/restaurant.jpg', alt: 'Type 1 Alt 2' },
      { value: 'soin', label: 'Etablissement de soin', image: 'assets/images/soin.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'art': [
      { value: 'musee', label: 'Musée / Exposition', image: 'assets/images/musée.jpg', alt: 'Type 1 Alt 1' },
      { value: 'cinema', label: 'Cinéma / Théâtre', image: 'assets/images/cinema.jpg', alt: 'Type 1 Alt 2' },
      { value: 'monument', label: 'Monuments historiques', image: 'assets/images/monument.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'medical': [
      { value: 'hopital', label: 'Hôpital / clinique', image: 'assets/images/hopital.jpg', alt: 'Type 1 Alt 1' },
      { value: 'cabinet', label: 'Cabinet médical', image: 'assets/images/cabinet.jpg', alt: 'Type 1 Alt 2' },
      { value: 'pharmacie', label: 'Pharmacie', image: 'assets/images/pharmacie.jpeg', alt: 'Type 1 Alt 2' },
      { value: 'laboratoire', label: "Laboratoire d'analyse", image: 'assets/images/labo.jpg', alt: 'Type 1 Alt 2' },
      { value: 'centreSante', label: "Centres de santé / EHPAD", image: 'assets/images/ehpad.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'industriel': [
      { value: 'usine', label: 'Usine', image: 'assets/images/usine.jpg', alt: 'Type 1 Alt 1' },
      { value: 'entrepots', label: 'Entrepots logistiques', image: 'assets/images/entrepot.jpg', alt: 'Type 1 Alt 2' },
      { value: 'atelier', label: 'Ateliers', image: 'assets/images/atelier.jpg', alt: 'Type 1 Alt 2' },
      { value: 'locaux', label: "Locaux techniques", image: 'assets/images/locaux.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'parc': [
      { value: 'ecPublic', label: 'Eclairage public', image: 'assets/images/ec_public.jpg', alt: 'Type 1 Alt 1' },
      { value: 'parc', label: 'Parc & Jardin', image: 'assets/images/parcc.jpg', alt: 'Type 1 Alt 2' },
      { value: 'plPublic', label: 'Place publique', image: 'assets/images/publicc.jpg', alt: 'Type 1 Alt 2' },
      { value: 'parking', label: "Parking", image: 'assets/images/parking.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'infrastructure': [
      { value: 'aeroport', label: 'Aéroport', image: 'assets/images/aéro.jpg', alt: 'Type 1 Alt 1' },
      { value: 'tunnel', label: 'Tunnel', image: 'assets/images/tunnel.jpg', alt: 'Type 1 Alt 2' },
      { value: 'gare', label: 'Gare de train', image: 'assets/images/gare.jpg', alt: 'Type 1 Alt 2' },
      { value: 'port', label: "Port", image: 'assets/images/port.jpg', alt: 'Type 1 Alt 2' },
      { value: 'metro', label: "Metro", image: 'assets/images/metro.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
    'sportif': [
      { value: 'terrain', label: 'Terrain/Stade', image: 'assets/images/stade.jpg', alt: 'Type 1 Alt 1' },
      { value: 'piscine', label: 'Piscine', image: 'assets/images/piscine.jpg', alt: 'Type 1 Alt 2' },
      { value: 'gymnase', label: 'Gymnase', image: 'assets/images/gymnase.jpg', alt: 'Type 1 Alt 2' },
      { value: 'salle', label: "Salle de sport", image: 'assets/images/salle_sport.jpg', alt: 'Type 1 Alt 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Type 1 Alt 2' },
    ],
  };
  espaces: { value: string, label: string, image: string, alt: string }[] = [
    { value: 'Chambre', label: 'Chambre', image: 'assets/images/chambre.jpg', alt: 'Image 1' },
    { value: 'Salon / séjour', label: 'Salon / séjour', image: 'assets/images/salon.jpg', alt: 'Image 2' },
    { value: 'Cuisine', label: 'Cuisine', image: 'assets/images/cuisine.jpg', alt: 'Image 3' },
    { value: 'Salle de bain', label: 'Salle de bain', image: 'assets/images/salle_de_bain.jpg', alt: 'Image 4' },
    { value: 'Abords exterieur', label: 'Abords exterieur', image: 'assets/images/bandelerie.jpg', alt: 'Image 6' },
    { value: 'Couloir', label: 'Couloir', image: 'assets/images/couloir.jpg', alt: 'Image 6' },
    { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Image 3' },
  ];
  surfaces: { value: string, label: string, image: string, alt: string }[] = [
    { value: 'Mur', label: 'Mur', image: 'assets/images/mur.jpg', alt: 'Image 1' },
    { value: 'Plafond', label: 'Plafond', image: 'assets/images/plafond.jpg', alt: 'Image 2' },
    { value: 'Sol', label: 'Sol', image: 'assets/images/sol.jpg', alt: 'Image 3' },
    { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Image 4' },
  ];
  poses : { [segment: string]: { value: string, label: string, image: string, alt: string }[] } = {

    'Plafond': [
      { value: 'Suspendu', label: 'Suspendu', image: 'assets/images/suspendu.jpg', alt: 'Pose 2' },
      { value: 'Encastré', label: 'Encastré', image: 'assets/images/encastré.jpg', alt: 'Pose 1' },
      { value: 'En saillie', label: 'En saillie', image: 'assets/images/en_saillie.jpg', alt: 'Pose 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Pose 5' },
    ],
    'Mur': [
      { value: 'En saillie', label: 'En saillie', image: 'assets/images/saillie2.jpg', alt: 'Pose 2' },
      { value: 'Encastré', label: 'Encastré', image: 'assets/images/encastré2.jpg', alt: 'Pose 1' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Pose 5' },
    ],
    'Sol': [
      { value: 'Encastré', label: 'Encastré', image: 'assets/images/encastré3.jpg', alt: 'Pose 1' },
      { value: 'En saillie', label: 'En saillie', image: 'assets/images/en_saillie3.jpg', alt: 'Pose 2' },
      { value: 'Sur mat', label: 'Sur mât', image: 'assets/images/sur_mat.jpg', alt: 'Pose 2' },
      { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Pose 5' },
    ],

  };
  materials: { value: string, label: string, image: string, alt: string }[] = [

    { value: 'Bois', label: 'Bois', image: 'assets/images/bois.webp', alt: 'Image 1' },
    { value:'Brique', label: 'Brique', image: 'assets/images/brique.jpg', alt: 'Image 2' },
    { value: 'Placo', label: 'Plâtre', image: 'assets/images/platre.jpg', alt: 'Image 4' },
    { value: 'Gravier', label: 'Gravier', image: 'assets/images/gravier.jpg', alt: 'Image 5' },
    { value:'Beton', label: 'Béton', image: 'assets/images/beton.jpg', alt: 'Image 6' },
    { value:'Terre végétale', label: 'Terre végétale', image: 'assets/images/terre.jpg', alt: 'Image 7' },
  ];
  formes: { value: string, label: string, image: string, alt: string }[] = [

    { value: 'Rond', label: 'Rond', image: 'assets/images/rond.png', alt: 'Image 1' },
    { value: 'Carré', label: 'Carré', image: 'assets/images/carre.png', alt: 'Image 2' },
    { value: 'Rectangulaire', label: 'Rectangulaire', image: 'assets/images/rectangulaire.svg', alt: 'Image 3' },
    { value: 'Linéaire', label: 'Linéaire', image: 'assets/images/ligne.png', alt: 'Image 4' },
    { value: ' ', label: 'Je ne sais pas', image: 'assets/images/jesaispas.jpg', alt: 'Image 4' },

  ];
   styles = [
    { label: 'Sobre & minimaliste' },
    { label: 'Industriel' },
    { label: 'Moderne' },
    { label: 'Couleurs vives' },
    { label: 'Ecologiste' },
    { label: 'Style ancien' }
  ];
  finitions = [
    { label: 'Blanc' },
    { label: 'Noir' },
    { label: 'Gris' },
    { label: 'Au choix' },

  ];
  selectedFinitionP = '';
  selectedProduct: any = null;
  showProduit = false;
  showDetails = false;
  showManufacture = false;
  selectedSegment: string | null = null;
  selectedSurface: string | null = null;
  selectedType: string | null = null;
  selectedEspace: string | null = null;
  selectedPose: string | null = null;
  selectedMaterial: string | null = null;
  selectedForme: string | null = null;
  selectedStyle: string | null = null;
  selectedFinition: string | null = null;
  selectedStanding: string | null = null;
  responses = [];
  produits = [];

goToAccueil(){
  this.router.navigate(['/accueil']);
}
goToWishlist(){
  this.router.navigate(['/wishlist']);
}
goToLogin(){
  this.router.navigate(['/login']);
}
goToProjects(){
  this.router.navigate(['/projects']);
}

  onSegmentChange(segment: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSegment = segment;
    } else {
      this.selectedSegment = null;
    }
  }
  onSurfaceChange(surface: string, event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked && surface !== 'Je ne sais pas') {
      this.selectedSurface = surface;
    } else {
      this.selectedSurface = null;
    }
  }
  onSelectChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedOption = selectElement.options[selectElement.selectedIndex].text;
    this.selectedEspace = selectedOption;
    console.log('Selected espace:', this.selectedEspace);
  }
  returnToMenu(){
    this.router.navigate(['/accueil'])
  }
  async showR(){

    let selectedResponses = this.responses.filter(response => {
      return (
        (this.selectedEspace === "" || response.Espace_a_traiter === this.selectedEspace)

      );
    });
    console.log(this.selectedSegment+" "+this.selectedSurface+" "+this.selectedEspace);
    console.log("selected responses :");
    console.log(selectedResponses);
    console.log("selected products :"
    );
    console.log(this.produits);

    let casValues = Array.from(new Set(selectedResponses.flatMap(response => [response.Choix1, response.Choix2, response.Choix3])));
    console.log("Cas values :");
    console.log(casValues);
// Filter products where Cas matches any of the Cas values in the responses
this.produits = this.produits.filter(product =>
  casValues.includes(product.Identifiant)
);
console.log("filtered products :");
console.log(this.produits);


      this.showProduit = true;

    }




ngOnInit(): void {


    console.log("user :");
    console.log(this.user);
  this.retrieveProducts();
  this.retrieveResponses();
  this.refreshWishlist();

}

toggleWishlist(product: any): void {
  // Check if user is defined
  if (this.user) {
    product.inWishlist = !product.inWishlist;
    if (product.inWishlist) {
      // Ensure user's wishlist exists before pushing
      if (!this.user.wishList) {
        this.user.wishList = [];
      }
      this.user.wishList.push(product);
    } else {
      // Filter out the product from the wishlist
      this.user.wishList = this.user.wishList.filter((item: any) => item.Cas !== product.Identifiant);
    }
    this.updateWishlistIcon(product);
  } else {
    console.error('User is not defined.');
  }
}


updateWishlistIcon(product: any): void {
  const wishlistButton = document.querySelector(`#wish${product.Identifiant}`);
  if (wishlistButton) {
    wishlistButton.textContent = product.inWishlist ? '❤️' : '♡';
  }
}

refreshWishlist(): void {

  if (this.produits.length > 0 && this.user!=null && this.user.wishList!=null) {
    for (const product of this.produits) {
      product.inWishlist = this.user.wishList.some((item: any) => item.Cas === product.Identifiant);
      this.updateWishlistIcon(product);
    }
  }
}
handleImageError($event){
  $event.target.src = 'assets/images/chambre.jpg';
}
retrieveProducts(): void {
  this.productService.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.produits = data;
    this.refreshWishlist();
  });
}

retrieveResponses(): void {
  this.responseService.getAll().snapshotChanges().pipe(
    map(changes =>
      changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      )
    )
  ).subscribe(data => {
    this.responses = data;
  });
}

displayDetails(product: any): void {
  console.log('Selected product:', product);
  this.selectedProduct = product;
  this.displayColors();
  this.showDetails = true;
  this.showProduit = false;


}
 finitionColors: string[] = [];
 finition = [];
firstTime = true;
displayColors() {
  if (this.firstTime) {
     this.finition = this.selectedProduct?.Finition?.split(',');
     this.finition.forEach(finition => {
      finition = finition.trim();
      if (finition.includes('Noir')) {
        this.finitionColors[finition]='black';
      }
      if (finition.includes('Blanc')) {
        this.finitionColors[finition]='white';
      }
      if (finition.includes('Gris')) {
        this.finitionColors[finition]='grey';
      }
      if (finition.includes('Doré')) {
        this.finitionColors[finition]='gold';
      }
    });
    console.log(this.finition);
    console.log(this.finitionColors);
    // IM TOO LAZY RIGHT NOW BUT I CAN JUST LOOP THROUGH THIS.COULEUROPTIONS IN HTML INSTEAD OF DOING THIS
    this.finitionColors = [...new Set(this.finitionColors)];
    this.firstTime = false;
  }
}



goBack(): void {
  this.showDetails = false;
  this.showProduit = true;
  this.firstTime = true;

  this.refreshWishlist();
}

send(): void {
  const option1 = document.getElementById('option1') as HTMLInputElement;
  const option2 = document.getElementById('option2') as HTMLInputElement;
  const option3 = document.getElementById('option3') as HTMLInputElement;

  if (option1.checked) console.log('Option 1 is checked');
  if (option2.checked) console.log('Option 2 is checked');
  if (option3.checked) console.log('Option 3 is checked');

  this.showDetails = false;
  this.showManufacture = true;
}
}
