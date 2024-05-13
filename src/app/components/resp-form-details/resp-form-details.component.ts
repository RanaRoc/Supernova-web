import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { ResponseService } from '../../services/response.service';
import { Response } from '../../models/response.model';

@Component({
  selector: 'app-response-details',
  templateUrl: './resp-form-details.component.html',
  styleUrls: ['./resp-form-details.component.css']
})
export class ResponseDetailsComponent implements OnInit, OnChanges {
  @Input() response?: Response;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentResponse: Response = {
    Espace_a_traiter: '',
    Finition : '',
    Forme : '',
  Materiaux_de_surface_de_pose: '',
    Mode_de_pose : '',
    Segment : '',
    Standing : '',
    Style : '',
    Surface_de_pose : '',
    Type_de_projet : ''
  };
  message = '';

  constructor(private responseService: ResponseService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentResponse = { ...this.response };
  }

  updatePublished(status: boolean): void {
    if (this.currentResponse.Cas) {
      this.responseService.update(this.currentResponse.Cas.toString(), { published: status })
      .then(() => {
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
    }
  }

  updateResponse(): void {
    const data = {
      title: this.currentResponse.Espace_a_traiter,
      description: this.currentResponse.Forme
    };

    if (this.currentResponse.Cas) {
      this.responseService.update(this.currentResponse.Cas.toString(), data)
        .then(() => this.message = 'The response was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deleteResponse(): void {
    if (this.currentResponse.Cas) {
      this.responseService.delete(this.currentResponse.Cas.toString())
        .then(() => {
          this.refreshList.emit();
          this.message = 'The response was updated successfully!';
        })
        .catch(err => console.log(err));
    }
  }
}
