import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChangeUserComponent } from './delete-change-user.component';

describe('DeleteChangeUserComponent', () => {
  let component: DeleteChangeUserComponent;
  let fixture: ComponentFixture<DeleteChangeUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteChangeUserComponent]
    });
    fixture = TestBed.createComponent(DeleteChangeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
