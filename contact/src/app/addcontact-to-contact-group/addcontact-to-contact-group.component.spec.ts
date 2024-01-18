import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontactToContactGroupComponent } from './addcontact-to-contact-group.component';

describe('AddcontactToContactGroupComponent', () => {
  let component: AddcontactToContactGroupComponent;
  let fixture: ComponentFixture<AddcontactToContactGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddcontactToContactGroupComponent]
    });
    fixture = TestBed.createComponent(AddcontactToContactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
