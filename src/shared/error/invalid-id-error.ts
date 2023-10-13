export default class InvalidIDError extends Error {
  constructor (id?: string) {
    super('Invalid ID error: ' + id)
    this.name = 'InvalidIDError'
  }
}
