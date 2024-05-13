import { Component, OnInit,Input } from '@angular/core';
import { ResponseService } from '../../services/response.service';
import { Response } from '../../models/response.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-response-list',
  templateUrl: './resp-form-list.component.html',
  styleUrls: ['./resp-form-list.component.css']
})
export class ResponsesListComponent implements OnInit {
  responses?: Response[];
  currentResponse?: Response;
  currentIndex = -1;

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.retrieveResponses();
  }

  refreshList(): void {
    this.currentResponse = undefined;
    this.currentIndex = -1;
    this.retrieveResponses();
  }

  retrieveResponses(): void {
    this.responseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({  key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.responses = data;
    });
  }

  setActiveResponse(response: Response, index: number): void {
    this.currentResponse = response;
    this.currentIndex = index;
  }

  removeAllResponses(): void {
    this.responseService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
}
