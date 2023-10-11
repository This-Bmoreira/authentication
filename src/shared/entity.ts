import { generateUUID } from '../adapter/gateways/uuid/uuid-manager'
import { left, right, type Either } from './either'
import MissingPropertyError from './error/missing-property-error'

export abstract class Entity<Props = unknown> {
  public readonly id: string
  public readonly props: Props

  constructor (props: Props, id?: string) {
    this.props = props
    this.id = id ?? generateUUID()
  }

  getId (): string {
    return this.id
  }

  toJSON (): Either<MissingPropertyError, Required<{ id: string } & Props>> {
    const toJSONResult: { id: string } & Props = {
      id: this.id,
      ...this.props
    }
    if (Object.values(toJSONResult).some(value => value === undefined)) {
      return left(new MissingPropertyError())
    }
    return right(toJSONResult as Required<{ id: string } & Props>)
  }
}
