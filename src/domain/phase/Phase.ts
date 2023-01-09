import { AggregateRoot } from '../shared/AggregateRoot'
import { PhaseId } from './PhaseId'
import { PhaseName } from './PhaseName'
import { PhaseStatus } from './PhaseStatus'
import { PhaseIsNotActiveException } from './PhaseIsNotActiveException'
import { PhaseWasCompleted } from './PhaseWasCompleted'
import { PhaseIsNotBlockedException } from './PhaseIsNotBlockedException'

export class Phase extends AggregateRoot {
  constructor(
    public readonly id: PhaseId,
    public readonly name: PhaseName,
    private _status: PhaseStatus
  ) {
    super()
  }

  get status(): PhaseStatus {
    return this._status
  }

  public markAsCompleted(): void {
    if (!this._status.isActive()) {
      throw new PhaseIsNotActiveException(this.name)
    }

    this._status = PhaseStatus.completed()

    this.recordThat(new PhaseWasCompleted(this.id.value))
  }

  public unblock(): void {
    if (!this._status.isBlocked()) {
      throw new PhaseIsNotBlockedException(this.name)
    }

    this._status = PhaseStatus.active()
  }
}
