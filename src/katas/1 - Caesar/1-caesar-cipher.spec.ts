// npx jest 1-caesar-cipher.spec --watch

// Caesar Cipher Kata
// This is a type of substitution cipher in which
// Each letter in the plaintext is shifted a certain number of places down the alphabet.
// For uppercase letters, with a shift of 1, A would be replaced by B, B would become C, and so on.
// For lowercase letters, a would be replaced by b, b would become c, and so on.
// When reaching the end of the alphabet, the cipher restarts at the beginning (wraps around) of the same case.
// For example, with a shift of 1, Z would become A, and z would become a.
// For any other character, the output is the same as the input.

// import { CaesarCipher } from "./1-caesar-cipher";
// import { CaesarCipherNames as CaesarCipher } from "./1-caesar-cipher";
// import { CaesarCipherFunctions as CaesarCipher } from "./1-caesar-cipher";
// import { CaesarCipherData as CaesarCipher } from "./1-caesar-cipher";
import { CaesarCipherObjects as CaesarCipher } from "./1-caesar-cipher";

describe("cipherCaesar", () => {
  let caesarCipher = new CaesarCipher();
  it("should correctly cipher uppercase letters", () => {
    const result = caesarCipher.encrypt("HELLO", 1);
    expect(result).toBe("IFMMP");
  });

  it("should correctly cipher lowercase letters", () => {
    const result = caesarCipher.encrypt("hello", 1);
    expect(result).toBe("ifmmp");
  });

  it("should correctly cipher with a large shift", () => {
    const result = caesarCipher.encrypt("hello", 27);
    expect(result).toBe("ifmmp");
  });

  it("should leave non-alphabet characters unchanged", () => {
    const result = caesarCipher.encrypt("hello world!", 1);
    expect(result).toBe("ifmmp xpsme!");
  });

  it("should handle negative shifts", () => {
    const result = caesarCipher.encrypt("ifmmp", -1);
    expect(result).toBe("hello");
  });

  it("should handle shifts larger than the alphabet size", () => {
    const result = caesarCipher.encrypt("hello", 53);
    expect(result).toBe("ifmmp");
  });
});
