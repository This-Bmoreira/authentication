import { type DomainError } from './domain-error'

export class InvalidIdentificationError extends Error implements DomainError {
  constructor (identification?: string) {
    super(`The email ( ${identification} ) is invalid.`)
    this.name = 'InvalidIdentificationError'
  }
}
