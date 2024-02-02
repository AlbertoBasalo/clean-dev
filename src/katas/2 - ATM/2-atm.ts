// usar para simplificar funciones, anidamiento...

// ! dirty implementation

export class ATM {
  private notesArray: number[];

  constructor() {
    // Available notes in the ATM
    this.notesArray = [500, 200, 100, 50, 20, 10, 5];
  }

  withdraw(money: number): number[] | null {
    if (money > 0) {
      if (money % 5 === 0) {
        if (money < 1000) {
          const result: number[] = [];
          let amount = money;

          for (const note of this.notesArray) {
            const notes = Math.floor(amount / note);
            if (notes > 0) {
              for (let i = 0; i < notes; i++) {
                result.push(note);
              }

              amount -= note * notes;
            }
          }
          if (amount === 0) {
            // The amount has been fully dispensed
            return result;
          }
          // Cannot dispense the amount with the available notes
          console.log("Cannot dispense the amount with the available notes.");
          return null;
        } else {
          console.log("The amount to withdraw cannot be greater than 1000.");
          return null;
        }
      } else {
        console.log("The amount to withdraw must be multiple of 5.");
        return null;
      }
    } else {
      console.log("The amount to withdraw must be greater than zero.");
      return null;
    }
  }
}

// ToDo 1 : better naming, no magic numbers, no comments

export class AtmNames {
  private availableNoteValues: number[];
  private readonly MAX_WITHDRAW_AMOUNT = 1000;
  private readonly MIN_NOTE_VALUE = 5;

  constructor() {
    this.availableNoteValues = [500, 200, 100, 50, 20, 10, 5];
  }

  withdraw(amount: number): number[] | null {
    if (amount > 0) {
      if (amount % this.MIN_NOTE_VALUE === 0) {
        if (amount < this.MAX_WITHDRAW_AMOUNT) {
          const notesToReturn: number[] = [];
          let pendingAmount = amount;

          for (const noteValue of this.availableNoteValues) {
            const notesOfValue = Math.floor(pendingAmount / noteValue);
            if (notesOfValue > 0) {
              for (let i = 0; i < notesOfValue; i++) {
                notesToReturn.push(noteValue);
              }
              const noteValueAmount = noteValue * notesOfValue;
              pendingAmount -= noteValueAmount;
            }
          }
          if (pendingAmount === 0) {
            return notesToReturn;
          }
          console.log("Cannot dispense the amount with the available notes.");
          return null;
        } else {
          console.log("The amount to withdraw cannot be greater than 1000.");
          return null;
        }
      } else {
        console.log("The amount to withdraw must be multiple of 5.");
        return null;
      }
    } else {
      console.log("The amount to withdraw must be greater than zero.");
      return null;
    }
  }
}

// ToDo 2 : one nested level, early return, no else
export class AtmFunctions {
  private availableNoteValues: number[];
  private readonly MAX_WITHDRAW_AMOUNT = 1000;
  private readonly MIN_NOTE_VALUE = 5;

  constructor() {
    this.availableNoteValues = [500, 200, 100, 50, 20, 10, 5];
  }

  withdraw(amount: number): number[] | null {
    if (!this.isValidAmount(amount)) {
      return null;
    }

    const notesToReturn: number[] = [];
    let pendingAmount = amount;

    for (const noteValue of this.availableNoteValues) {
      const notesOfValue = Math.floor(pendingAmount / noteValue);
      this.fillNotesToReturn(notesToReturn, notesOfValue, noteValue);
      const noteValueAmount = noteValue * notesOfValue;
      pendingAmount = pendingAmount - noteValueAmount;
    }
    if (pendingAmount === 0) {
      return notesToReturn;
    }
    console.log("Cannot dispense the amount with the available notes.");
    return null;
  }

  private isValidAmount(amount: number) {
    if (amount <= 0) {
      console.log("The amount to withdraw must be greater than zero.");
      return false;
    }
    if (amount % this.MIN_NOTE_VALUE !== 0) {
      console.log("The amount to withdraw must be multiple of 5.");
      return false;
    }
    if (amount > this.MAX_WITHDRAW_AMOUNT) {
      console.log("The amount to withdraw cannot be greater than 1000.");
      return false;
    }
    return true;
  }

  private fillNotesToReturn(notesToReturn: number[], notesOfValue: number, noteValue: number) {
    for (let i = 0; i < notesOfValue; i++) {
      notesToReturn.push(noteValue);
    }
  }
}

// ToDO 3 : structs to validate amount, and the notes to return

export class Amount {
  private readonly MAX_WITHDRAW_AMOUNT = 1000;
  private readonly MIN_NOTE_VALUE = 5;
  public readonly isValid: boolean;

  constructor(public readonly value: number) {
    this.isValid = this.validate();
  }

  validate() {
    if (this.value <= 0) {
      console.log("The amount to withdraw must be greater than zero.");
      return false;
    }
    if (this.value % this.MIN_NOTE_VALUE !== 0) {
      console.log("The amount to withdraw must be multiple of 5.");
      return false;
    }
    if (this.value > this.MAX_WITHDRAW_AMOUNT) {
      console.log("The amount to withdraw cannot be greater than 1000.");
      return false;
    }
    return true;
  }
}

export class Wallet {
  notes: number[] = [];

  public get value(): number {
    let value = 0;
    for (const note of this.notes) {
      value += note;
    }
    return value;
  }

  addnotes(notesOfValue: number, noteValue: number) {
    for (let i = 0; i < notesOfValue; i++) {
      this.notes.push(noteValue);
    }
  }
}

export class AtmData {
  private availableNoteValues: number[];

  constructor() {
    this.availableNoteValues = [500, 200, 100, 50, 20, 10, 5];
  }

  withdraw(amount: Amount): number[] | null {
    if (!amount.isValid) {
      return null;
    }
    const wallet = new Wallet();
    let pendingAmount = amount.value;

    for (const noteValue of this.availableNoteValues) {
      const notesOfValue = Math.floor(pendingAmount / noteValue);
      wallet.addnotes(notesOfValue, noteValue);
      pendingAmount = amount.value - wallet.value;
    }
    if (pendingAmount === 0) {
      return wallet.notes;
    }
    console.log("Cannot dispense the amount with the available notes.");
    return null;
  }
}
