import { v4 as uuid, validate } from 'uuid'
import { ValueObject } from './ValueObject'
import { InvalidArgumentException } from './InvalidArgumentException'

export class Uuid extends ValueObject {
  constructor(public readonly value: string) {
    super()

    this.ensureIsValidUuid(value)
  }

  public static generate(): Uuid {
    return new Uuid(uuid())
  }

  private ensureIsValidUuid(uuid: string): void {
    if (!validate(uuid)) {
      throw new InvalidArgumentException(`"${uuid}" is not a valid <${this.constructor.name}>`)
    }
  }
}
