import { ValueObject } from '../shared/ValueObject'

export class TaskTitle extends ValueObject {
  constructor(public readonly value: string) {
    super()
  }
}
