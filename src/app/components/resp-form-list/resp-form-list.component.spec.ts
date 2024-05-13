import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesListComponent } from './resp-form-list.component';

describe('RespFormListComponent', () => {
  let component: ResponsesListComponent;
  let fixture: ComponentFixture<ResponsesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponsesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
