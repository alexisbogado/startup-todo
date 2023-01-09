import { ValueObject } from '../shared/ValueObject'
import { InvalidArgumentException } from '../shared/InvalidArgumentException'

enum Status {
  BLOCKED = 'BLOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
}

export class PhaseStatus extends ValueObject {
  private constructor(public readonly value: Status) {
    super()
  }

  public isActive(): boolean {
    return this.value === Status.ACTIVE
  }

  public isBlocked(): boolean {
    return this.value === Status.BLOCKED
  }

  public static blocked(): PhaseStatus {
    return new PhaseStatus(Status.BLOCKED)
  }

  public static active(): PhaseStatus {
    return new PhaseStatus(Status.ACTIVE)
  }

  public static completed(): PhaseStatus {
    return new PhaseStatus(Status.COMPLETED)
  }

  public static fromString(status: string): PhaseStatus {
    const statusValue = status as Status
    const isValudStatus = Object.values(Status).includes(statusValue)

    if (!isValudStatus) {
      throw new InvalidArgumentException(`Phase status "${status}" is not valid`)
    }

    return new PhaseStatus(statusValue)
  }
}
