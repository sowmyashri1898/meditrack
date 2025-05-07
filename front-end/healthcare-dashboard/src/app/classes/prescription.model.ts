export class Prescription {
    medicationName!: string;
    dosage!: string;
    quantity!: number;
    morning: boolean = false;
    afternoon: boolean = false;
    night: boolean = false;
    beforeFood: boolean = false;
    afterFood: boolean = false;
    instructions: string = '';
  }
  