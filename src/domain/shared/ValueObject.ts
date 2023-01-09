import { isEqual } from 'lodash'

export abstract class ValueObject {
  public equals(valueObject: ValueObject): boolean {
    return isEqual(this, valueObject)
  }
}
