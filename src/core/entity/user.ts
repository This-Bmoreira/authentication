// import { validateName, validatePassword } from '../../adapter/gateways/validator/validator-manager'
import { ValidatorAdapter } from '../../external/lib/validator/validator-adapter'
import { left, right, type Either } from '../../shared/either'
import { Entity } from '../../shared/entity'
import { InvalidEmailError } from '../error/invalid-email'
import { InvalidNameError } from '../error/invalid-name'
import { InvalidPasswordError } from '../error/invalid-password'
import type { UpdateNameData, UpdatePasswordData, UserData } from './userdata.interface'

export class UserEntity extends Entity<UserData> {
  private constructor (userData: UserData, id?: string) {
    super(userData, id)
    this.props.createAt = this.props.createAt ?? new Date()
    Object.freeze(this)
  }

  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, UserEntity> {
    const nameIsValid = this.validateName(userData.name)
    const emailIsValid = this.validateEmail(userData.email)
    const passwordIsValid = this.validatePassword(userData.password)

    if (!nameIsValid) {
      return left(new InvalidNameError(userData.name))
    }

    if (!emailIsValid) {
      return left(new InvalidEmailError(userData.email))
    }

    if (!passwordIsValid) {
      return left(new InvalidPasswordError(userData.password))
    }

    return right(new UserEntity(userData))
  }

  static updateUserWithNewName (data: UpdateNameData): Either<InvalidNameError, string> {
    const isNameValid = this.validateName(data.newName)

    if (!isNameValid) {
      return left(new InvalidNameError(data.newName))
    }

    const updatedUserData = {
      ...data.oldUserData,
      name: data.newName
    }

    const newName = updatedUserData.name

    return right(newName)
  }

  static updateUserWithNewPassword (data: UpdatePasswordData): Either<InvalidPasswordError, string> {
    const isPasswordValid = this.validatePassword(data.newPassword)

    if (!isPasswordValid) {
      return left(new InvalidPasswordError(data.newPassword))
    }

    const updatedUserData = {
      ...data.oldUserData,
      password: data.newPassword
    }

    const newPassword = updatedUserData.password

    return right(newPassword)
  }

  static validateName (name: string): boolean {
    const nameValidator = new ValidatorAdapter()
    return nameValidator.isName(name).isRight()
  }

  static validateEmail (email: string): boolean {
    const emailValidator = new ValidatorAdapter()
    return emailValidator.isEmail(email).isRight()
  }

  static validatePassword (password: string): boolean {
    const passwordValidator = new ValidatorAdapter()
    return passwordValidator.isPassword(password).isRight()
  }
}
