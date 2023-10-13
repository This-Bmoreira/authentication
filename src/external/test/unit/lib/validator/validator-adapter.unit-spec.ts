import { describe } from 'node:test';
import { InvalidNameError } from '../../../../../core/error/invalid-name';
import { InvalidPasswordError } from '../../../../../core/error/invalid-password';
import { ValidatorAdapter } from '../../../../lib/validator/validator-adapter';
import { InvalidEmailError } from '../../../../../core/error/invalid-email';
describe('ValidatorAdapter', () => {
  let sut;

  beforeAll(() => {
    sut = new ValidatorAdapter();
  });
  describe('isName', () => {
    test('should validate a valid name', () => {
      const name = 'John Doe';
      const result = sut.isName(name);
      expect(result.isRight()).toBe(true);
    });

    test(`should return InvalidNameError when name is invalid`, () => {
      const invalidNames = [
        '',
        '123',
        'John Doe!',
        'John123',
        'John@Doe',
        ' John Doe',
        'John Doe ',
      ];
      invalidNames.forEach((name) => {
        const result = sut.isName(name);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidNameError);
      });
    })
  })
  describe('isPassword', () => {
    test('should validate a valid password', () => {
      const validPassword = 'StrongPass123!';
      const result = sut.isPassword(validPassword);
      expect(result.isRight()).toBe(true);
    });

    test(`should return InvalidPasswordError for invalid passwords`, () => {
      const invalidPasswords = [
        'weak',             // Senha muito curta (menos de 8 caracteres)
        'OnlyLowercase',    // Sem caracteres maiúsculos
        'ONLYUPPERCASE',    // Sem caracteres minúsculos
        'noDigits123',      // Sem números
        '1Upper123',        // Faltam símbolos
        'LongButWeak1',     // Caracteres especiais faltando
        'StrongP@ss',       // Tamanho correto, mas faltam números
        'Short!1',          // Tamanho incorreto
        'noSymbols',        // Sem símbolos
        '@#$%¨&*(@!@#$!!',  // Apenas símbolos
      ];
      invalidPasswords.forEach((password) => {
        const result = sut.isPassword(password);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidPasswordError);
      });
    })
  });
  describe('isEmail', () => {
    test('should validate a valid email', () => {
      const validPassword = 'any@email.com';
      const result = sut.isEmail(validPassword);
      expect(result.isRight()).toBe(true);
    });

    test(`should return InvalidPasswordError for invalid email`, () => {
      const invalidEmails = [
        'invalid-email', // Falta o "@".
        'test@',         // Falta o domínio.
        'test.com',      // Falta o "@" e o domínio.
        '@.com',         // Falta o nome do usuário.
        'test@.com',     // Falta o nome do usuário.
        'test@com',      // Falta o ponto após o domínio.
        '@',             // Falta o nome do usuário e o domínio.
        'invalid.email', // Caracteres especiais não permitidos no domínio.
        'test@.com!',    // Caracteres especiais não permitidos no domínio.
      ];
      invalidEmails.forEach((email) => {
        const result = sut.isEmail(email);
        expect(result.isLeft()).toBe(true);
        expect(result.value).toBeInstanceOf(InvalidEmailError);
      });
    })
  });
});