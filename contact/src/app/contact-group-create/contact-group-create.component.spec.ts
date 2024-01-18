import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactGroupComponent } from './contact-group-create.component';

describe('ContactGroupCreateComponent', () => {
  let component: CreateContactGroupComponent;
  let fixture: ComponentFixture<CreateContactGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateContactGroupComponent]
    });
    fixture = TestBed.createComponent(CreateContactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
