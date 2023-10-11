import { UUIDAdapter } from '../../../external/lib/uuid/uuid-adapter'

export const generateUUID = (): string => {
  const uuidManager = new UUIDAdapter()
  return uuidManager.generateUUID()
}
