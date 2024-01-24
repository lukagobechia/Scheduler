import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeleteJobComponent } from './add-delete-job.component';

describe('AddDeleteJobComponent', () => {
  let component: AddDeleteJobComponent;
  let fixture: ComponentFixture<AddDeleteJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeleteJobComponent]
    });
    fixture = TestBed.createComponent(AddDeleteJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
