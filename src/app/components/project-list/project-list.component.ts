import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { PdfGenerationService } from '../../services/pdf-generation.service';
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[];
  user: any;
  fullName = "";
  showList = true;
  showProjectD = false;
  selectedProject: Project;
  espace  = [];
  espaceOptions: { value: string, label: string, image: string, alt: string }[] = [];
  espaces: { value: string, label: string, image: string, alt: string }[] = [
    { value: 'chambres', label: 'chambres', image: 'assets/images/chambre.jpg', alt: 'Image 1' },
    { value: 'Séjour', label: 'Séjour', image: 'assets/images/salon.jpg', alt: 'Image 2' },
    { value: 'cuisine', label: 'cuisine', image: 'assets/images/cuisine.jpg', alt: 'Image 3' },
    { value: 'Bureau', label: 'Bureau', image: 'assets/images/bureau.jpg', alt: 'Image 5' },
    { value: 'sanitaires', label: 'sanitaires', image: 'assets/images/salle_de_bain.jpg', alt: 'Image 4' },
    { value: 'Buanderie', label: 'Buanderie', image: 'assets/images/bandelerie.jpg', alt: 'Image 6' },
    { value: 'Couloir', label: 'Couloir', image: 'assets/images/couloir.jpg', alt: 'Image 6' },
    { value: ' ', label: 'Je ne sais pas', image: 'assets/images/autre.jpg', alt: 'Image 3' },
  ];

  constructor(private projectService: ProjectService, private userService: UserService, private router : Router, private pdfService :PdfGenerationService) {}

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
  ngOnInit() {
    this.projectService.getAll().valueChanges().subscribe((data) => {
      this.projects = Object.values(data);
    });
  }
  generatePdf() {
    this.pdfService.generatePdf(this.selectedProject);
  }
  deleteP() {
    console.log(this.selectedProject.key); // Add this line to verify the key
    this.projectService.removeProjectByName(this.selectedProject.Nom).then(() => {
      // Re-fetch projects after deletion
      this.projectService.getAll().valueChanges().subscribe((data) => {
        this.projects = Object.values(data);
      });
this.goBack();    }).catch(error => {
      console.error("Error deleting project: ", error);
    });
  }
  goBack() {
    this.showList = true;
    this.showProjectD = false;
  }
  showProject(project: Project) {
    this.showList = false;
    this.showProjectD = true;
    this.selectedProject = project;
    this.extractEspaces();  // Appeler la méthode pour extraire les espaces
    console.log(this.selectedProject.Products[0]);
    console.log(this.espace);
  }
  convertDropboxLink(originalLink: string): string {
    // Validate the original Dropbox link format

    // Replace 'www.dropbox.com' with 'dl.dropboxusercontent.com'
    const directLink = originalLink.replace('www.dropbox.com', 'dl.dropboxusercontent.com');

    // Remove all unnecessary query parameters and set raw=1
    return directLink;
  }

envoyer(){
  console.log("SEEND")
  this.generatePdf();

}

  extractEspaces() {
    // Initialize a new Set to hold unique values
    const uniqueEspaces = new Set();

    // Iterate over the Products and add each Espace_a_traiter to the Set
    for (let i = 0; i < this.selectedProject.Products.length; i++) {
      uniqueEspaces.add(this.selectedProject.Products[i].Espace_a_traiter);
    }

    // Convert the Set back to an array and assign it to this.espace
    this.espace = Array.from(uniqueEspaces);
  }


}
