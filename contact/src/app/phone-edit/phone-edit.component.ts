import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-phone-edit',
  templateUrl: './phone-edit.component.html',
  styleUrls: ['./phone-edit.component.css']
})
export class PhoneEditComponent {
  @Input() phone: any; // Remplacez 'any' par votre type de données pour un téléphone
  @Output() phoneUpdated = new EventEmitter<any>(); // Émetteur d'événement pour la mise à jour

  phoneForm = new FormGroup({
    phoneKind: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required)
  });

  constructor() {}

  ngOnChanges() {
    if (this.phone) {
      this.phoneForm.setValue({
        phoneKind: this.phone.phoneKind,
        phoneNumber: this.phone.phoneNumber
      });
    }
  }

  onSubmit() {
    if (this.phoneForm.valid) {
      this.phoneUpdated.emit(this.phoneForm.value);
    }
  }
}
