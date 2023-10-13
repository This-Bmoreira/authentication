import isEmail from 'validator/lib/isEmail'
import isStrongPassword from 'validator/lib/isStrongPassword'
import { type ICustomValidator } from '../../../adapter/gateways/validator/validator-interface'
import { InvalidEmailError } from '../../../core/error/invalid-email'
import { InvalidNameError } from '../../../core/error/invalid-name'
import { InvalidPasswordError } from '../../../core/error/invalid-password'
import { left, right, type Either } from '../../../shared/either'

export class ValidatorAdapter implements ICustomValidator {
  isName (name: string): Either<InvalidNameError, boolean> {
    const regex = /^[A-Za-zÁ-ÿ]['A-Za-zÁ-ÿ\s]*(?<!\s)$/
    const isValid = regex.test(name)
    if (!isValid) {
      return left(new InvalidNameError(name))
    }
    return right(isValid)
  }

  isPassword (password: string): Either<InvalidPasswordError, boolean> {
    const isValid = isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    if (!isValid) {
      return left(new InvalidPasswordError(password))
    }
    return right(isValid)
  }

  isEmail (valor: string): Either<InvalidEmailError, boolean> {
    const isValid = isEmail(valor)
    if (!isValid) {
      return left(new InvalidEmailError(valor))
    }
    return right(isValid)
  }
}
