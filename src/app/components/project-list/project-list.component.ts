import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
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
  espace: string[] = [];  // Change to string array to store space strings
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

  constructor(private projectService: ProjectService, private userService: UserService, private router : Router) {}

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
  delete() {
    console.log(this.selectedProject.key); // Add this line to verify the key
    this.projectService.removeProject(this.selectedProject.key.toString()).then(() => {
      // Re-fetch projects after deletion
      this.projectService.getAll().valueChanges().subscribe((data) => {
        this.projects = Object.values(data);
      });
      this.showList = true;
      this.showProjectD = false;
    }).catch(error => {
      console.error("Error deleting project: ", error);
    });
  }

  showProject(project: Project) {
    this.showList = false;
    this.showProjectD = true;
    this.selectedProject = project;
     // this.extractEspaces();  // Appeler la méthode pour extraire les espaces
    console.log(this.selectedProject);
    console.log(this.espace);
  }


  extractEspaces() {
    for(let i =0;i<this.selectedProject.Products.length;i++){
      this.espace.push(this.selectedProject.Products[i].data.Espace_a_traiter);  // Ajouter l'espace à traiter à la liste
    }
    console.log(this.espace);


  }


}
