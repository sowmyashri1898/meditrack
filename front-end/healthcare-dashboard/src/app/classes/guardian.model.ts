// Assuming the GuardianDTO class looks like this:
export class GuardianDTO {
    id?: number;
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    relationship: string;

    constructor(id: number, firstName: string, lastName: string, contactNumber: string, email: string, relationship: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.contactNumber = contactNumber;
        this.email = email;
        this.relationship = relationship;
        
    }
}
