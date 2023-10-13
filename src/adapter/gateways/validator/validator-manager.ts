import { ValidatorAdapter } from '../../../external/lib/validator/validator-adapter'

export const validateName = (name: string): boolean => {
  const validatorManager = new ValidatorAdapter()
  return validatorManager.isName(name).isRight()
}

export const validateEmail = (email: string): boolean => {
  const validatorManager = new ValidatorAdapter()
  return validatorManager.isEmail(email).isRight()
}

export const validatePassword = (password: string): boolean => {
  const validatorManager = new ValidatorAdapter()
  return validatorManager.isPassword(password).isRight()
}
