import { ValueObject } from '../shared/ValueObject'

export class PhaseName extends ValueObject {
  constructor(public readonly value: string) {
    super()
  }
}
