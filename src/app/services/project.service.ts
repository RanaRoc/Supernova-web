import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Project } from '../models/project.model';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private dbPath = '/project';

  projectsRef: AngularFireList<Project>;

  constructor(private db: AngularFireDatabase) {
    this.projectsRef = db.list(this.dbPath);
  }
  addProject(project: Project): void {

     this.projectsRef.push(project);
  }
  getAll(): AngularFireList<Project> {
    return this.projectsRef;
  }
  removeProject(id: string): Promise<void> {
    return this.projectsRef.remove(id);
  }

  updateProject(id: string, updatedProject: Project): Promise<void> {
    return this.projectsRef.update(id, updatedProject);
  }


}
