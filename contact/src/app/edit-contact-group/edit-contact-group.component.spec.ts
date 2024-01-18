import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactGroupComponent } from './edit-contact-group.component';

describe('EditContactGroupComponent', () => {
  let component: EditContactGroupComponent;
  let fixture: ComponentFixture<EditContactGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContactGroupComponent]
    });
    fixture = TestBed.createComponent(EditContactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
