import { type Either } from '../../../shared/either'

export interface ICustomValidator {
  isPassword: (password: string) => Either<Error, boolean>
  isEmail: (valor: string) => Either<Error, boolean>
  isName: (name: string) => Either<Error, boolean>
}
