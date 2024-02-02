// ? What is doing this code?

// ! minimal cryptic implementation
export class Caesar {
  encript(text: string, code: number): string {
    let res = "";
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i);
      let b = 0;
      if (char >= 65 && char <= 90) {
        b = 65;
      } else if (char >= 97 && char <= 122) {
        b = 97;
      }
      if (b != 0) {
        char = ((char - b + code) % 26) + b;
      }
      res += String.fromCharCode(char);
    }
    return res;
  }
}

// ToDo 1 -No magic numbers, no magic strings, no magic expressions

export class CaesarCipherNames {
  private readonly CASE_LENGTH = 26;
  private readonly FIRST_UPPERCASE = "A".charCodeAt(0);
  private readonly LAST_UPPERCASE = this.FIRST_UPPERCASE + this.CASE_LENGTH - 1;
  private readonly FIRST_LOWERCASE = "a".charCodeAt(0);
  private readonly LAST_LOWERCASE = this.FIRST_LOWERCASE + this.CASE_LENGTH - 1;

  encrypt(plainText: string, offset: number): string {
    let cipherText = "";
    for (let position = 0; position < plainText.length; position++) {
      let plainCharCode = plainText.charCodeAt(position);
      let encryptedCharCode = plainCharCode;
      let caseStart = 0;
      let isUppercase = plainCharCode >= this.FIRST_UPPERCASE && plainCharCode <= this.LAST_UPPERCASE;
      let isLowercase = plainCharCode >= this.FIRST_LOWERCASE && plainCharCode <= this.LAST_LOWERCASE;
      if (isUppercase) {
        caseStart = this.FIRST_UPPERCASE;
      } else if (isLowercase) {
        caseStart = this.FIRST_LOWERCASE;
      }
      let isLetter = isUppercase || isLowercase;
      if (isLetter) {
        let zeroBasedCase = plainCharCode - caseStart;
        let offsetShift = zeroBasedCase + offset;
        let normalizedShift = offsetShift % this.CASE_LENGTH;
        encryptedCharCode = normalizedShift + caseStart;
      }
      cipherText += String.fromCharCode(encryptedCharCode);
    }
    return cipherText;
  }
}

// ToDo 2 : one nested level, early return, no else

export class CaesarCipherFunctions {
  private readonly CASE_LENGTH = 26;
  private readonly FIRST_UPPERCASE = "A".charCodeAt(0);
  private readonly LAST_UPPERCASE = this.FIRST_UPPERCASE + this.CASE_LENGTH - 1;
  private readonly FIRST_LOWERCASE = "a".charCodeAt(0);
  private readonly LAST_LOWERCASE = this.FIRST_LOWERCASE + this.CASE_LENGTH - 1;

  encrypt(plainText: string, offset: number): string {
    let encryptedText = "";
    for (let position = 0; position < plainText.length; position++) {
      let plainCharCode = plainText.charCodeAt(position);
      let encrytedCharCode = this.encryptCharCode(plainCharCode, offset);
      let encryptedChar = String.fromCharCode(encrytedCharCode);
      encryptedText += encryptedChar;
    }
    return encryptedText;
  }

  private encryptCharCode(plainCharCode: number, offset: number): number {
    let encryptedCharCode = plainCharCode;
    let caseStart = this.getCaseStart(plainCharCode);
    let isLetter = caseStart !== 0;
    if (isLetter) {
      encryptedCharCode = this.shiftCharCode(plainCharCode, offset, caseStart);
    }
    return encryptedCharCode;
  }
  private getCaseStart(plainCharCode: number): number {
    let isUppercase = plainCharCode >= this.FIRST_UPPERCASE && plainCharCode <= this.LAST_UPPERCASE;
    if (isUppercase) {
      return this.FIRST_UPPERCASE;
    }
    let isLowercase = plainCharCode >= this.FIRST_LOWERCASE && plainCharCode <= this.LAST_LOWERCASE;
    if (isLowercase) {
      return this.FIRST_LOWERCASE;
    }
    return 0;
  }
  private shiftCharCode(plainChar: number, offset: number, caseStart: number): number {
    let zeroBasedCase = plainChar - caseStart;
    let offsetShift = zeroBasedCase + offset;
    let normalizedShift = offsetShift % this.CASE_LENGTH;
    let encriptedChar = normalizedShift + caseStart;
    return encriptedChar;
  }
}

// ToDo 3 : structs to handle letter cases, strings char codes and shifts...

// class LetterCase {
//   first: Letter;
//   last: Letter;

//   constructor(first: Letter, length: number = 26) {
//     this.first = first;
//     this.last = new Letter();
//     this.last.code = first.code + length - 1;
//   }
//   isInRange(letter: Letter): boolean {
//     return letter.code >= this.first.code && letter.code <= this.last.code;
//   }
// }

// class Letter {
//   _code: number = 0;
//   _char: string = "";

//   set code(code: number) {
//     this._code = code;
//     this._char = String.fromCharCode(code);
//   }
//   get code(): number {
//     return this._code;
//   }

//   set char(char: string) {
//     this._char = char;
//     this._code = char.charCodeAt(0);
//   }
//   get char(): string {
//     return this._char;
//   }

//   constructor(char?: string) {
//     if (char) {
//       this.char = char;
//     }
//   }
// }

// export class CaesarCipherData {
//   private readonly CASE_LENGTH = 26;
//   private readonly UPPERCASE = new LetterCase(new Letter("A"), this.CASE_LENGTH);
//   private readonly LOWERCASE = new LetterCase(new Letter("a"), this.CASE_LENGTH);
//   private offset: number;

//   // ? change public interface by using an struct {plainText, offset}

//   encrypt(plainText: string, offset: number): string {
//     this.offset = offset;
//     let encryptedText = "";
//     for (let position = 0; position < plainText.length; position++) {
//       let currentLetter = new Letter(plainText[position]);
//       let encryptedLetter = this.shift(currentLetter);
//       encryptedText += encryptedLetter.char;
//     }
//     return encryptedText;
//   }

//   private getCaseStart(plainLetter: Letter): Letter {
//     if (this.UPPERCASE.isInRange(plainLetter)) {
//       return this.UPPERCASE.first;
//     }
//     if (this.LOWERCASE.isInRange(plainLetter)) {
//       return this.LOWERCASE.first;
//     }
//     return new Letter();
//   }

//   private shift(plainChar: Letter): Letter {
//     let caseStart: Letter = this.getCaseStart(plainChar);
//     if (caseStart.code === 0) return plainChar;
//     let zeroBasedCase = plainChar.code - caseStart.code;
//     let offsetShift = zeroBasedCase + this.offset;
//     let normalizedShift = offsetShift % this.CASE_LENGTH;
//     let encriptedCode = normalizedShift + caseStart.code;
//     let encriptedLetter = new Letter();
//     encriptedLetter.code = encriptedCode;
//     return encriptedLetter;
//   }

// }

// ToDo 4 : class logic
class LetterCase {
  first: Letter;
  last: Letter;

  constructor(first: Letter, length: number = 26) {
    this.first = first;
    this.last = new Letter();
    this.last.charCode = first.charCode + length - 1;
  }
  isInRange(letter: Letter): boolean {
    return letter.charCode >= this.first.charCode && letter.charCode <= this.last.charCode;
  }
}

class Letter {
  private readonly CASE_LENGTH = 26;
  private _charCode: number = 0;
  private _char: string = "";

  set charCode(charCode: number) {
    this._charCode = charCode;
    this._char = String.fromCharCode(charCode);
  }
  get charCode(): number {
    return this._charCode;
  }

  set char(char: string) {
    this._char = char;
    this._charCode = char.charCodeAt(0);
  }
  get char(): string {
    return this._char;
  }

  constructor(char?: string) {
    if (char) {
      this.char = char;
    }
  }

  public shift(offset: number, caseStart: Letter) {
    if (caseStart.charCode === 0) return;
    let zeroBasedCase = this.charCode - caseStart.charCode;
    let offsetShift = zeroBasedCase + offset;
    let normalizedShift = offsetShift % this.CASE_LENGTH;
    let encriptedChar = normalizedShift + caseStart.charCode;
    this.charCode = encriptedChar;
  }
}

export class CaesarCipherObjects {
  private readonly CASE_LENGTH = 26;
  private readonly UPPERCASE = new LetterCase(new Letter("A"), this.CASE_LENGTH);
  private readonly LOWERCASE = new LetterCase(new Letter("a"), this.CASE_LENGTH);

  encrypt(plainText: string, offset: number): string {
    let encryptedText = "";
    for (let position = 0; position < plainText.length; position++) {
      let currentLetter = new Letter(plainText[position]);
      currentLetter.shift(offset, this.getCaseStart(currentLetter));
      encryptedText += currentLetter.char;
    }
    return encryptedText;
  }

  private getCaseStart(plainLetter: Letter): Letter {
    if (this.UPPERCASE.isInRange(plainLetter)) {
      return this.UPPERCASE.first;
    }
    if (this.LOWERCASE.isInRange(plainLetter)) {
      return this.LOWERCASE.first;
    }
    return new Letter();
  }
}
