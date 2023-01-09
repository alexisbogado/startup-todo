import { AggregateRoot } from '../shared/AggregateRoot'
import { PhaseId } from '../phase/PhaseId'
import { TaskId } from './TaskId'
import { TaskTitle } from './TaskTitle'
import { TaskIsAlreadyMarkedAsDoneException } from './TaskIsAlreadyMarkedAsDoneException'
import { TaskWasDone } from './TaskWasDone'

export class Task extends AggregateRoot {
  constructor(
    public readonly id: TaskId,
    public readonly phaseId: PhaseId,
    public readonly title: TaskTitle,
    protected _isDone: boolean
  ) {
    super()
  }

  get isDone(): boolean {
    return this._isDone
  }

  public markAsDone(): void {
    if (this._isDone) {
      throw new TaskIsAlreadyMarkedAsDoneException(this.title)
    }

    this._isDone = true

    this.recordThat(new TaskWasDone(this.id.value, this.phaseId.value))
  }
}
