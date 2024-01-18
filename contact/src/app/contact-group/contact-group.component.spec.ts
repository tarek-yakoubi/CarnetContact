import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupComponent } from './contact-group.component';

describe('ContactGroupComponent', () => {
  let component: ContactGroupComponent;
  let fixture: ComponentFixture<ContactGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactGroupComponent]
    });
    fixture = TestBed.createComponent(ContactGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
