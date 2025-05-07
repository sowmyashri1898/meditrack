interface Medication {
    medicationId: number;
    dosageId: number;
    quantity: number;
    morningBeforeFood: boolean;
    morningAfterFood: boolean;
    afternoonBeforeFood: boolean;
    afternoonAfterFood: boolean;
    nightBeforeFood: boolean;
    nightAfterFood: boolean;
    note: string;
  }