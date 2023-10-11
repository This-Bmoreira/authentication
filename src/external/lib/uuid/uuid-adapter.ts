import { v4 as uuidv4 } from 'uuid'
import { type IUUID } from '../../../adapter/gateways/uuid/uuid.interface'

export class UUIDAdapter implements IUUID {
  generateUUID (): string {
    const generatedUUID = uuidv4()
    return generatedUUID
  }
}
