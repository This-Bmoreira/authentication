export default class MissingPropertyError extends Error {
  constructor (Property?: any) {
    super('Missing property: ' + Property)
    this.name = 'MissingPropertyError'
  }
}
