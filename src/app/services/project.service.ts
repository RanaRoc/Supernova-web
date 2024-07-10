import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Project } from '../models/project.model';
import { Observable, map, switchMap, take } from 'rxjs';

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
removeProjectByName(name: string): Promise<void> {
  const project = this.projectsRef.snapshotChanges().pipe(
    take(1),
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ),
    map(projects => projects.find(p => p.Nom === name))
  );

  return project.pipe(
    switchMap(p => this.projectsRef.remove(p.key.toString()))
  ).toPromise();
}
  updateProject(id: string, updatedProject: Project): Promise<void> {
    return this.projectsRef.update(id, updatedProject);
  }


}
