export class Contact {
  idContact: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: {
      street: string;
      city: string;
      zip: string;
      country: string;
  };
  phones: {
      phoneKind: string;
      phoneNumber: string;
  }[] = [];

  constructor() {
    this.idContact = 0;
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.address = {
        street: '',
        city: '',
        zip: '',
        country: ''
    };
    phones: [
            { phoneKind: 'fixe', phoneNumber: '' },
            { phoneKind: 'mobile', phoneNumber: '' }
        ]
  }
}
