import { DomainEvent } from '../shared/DomainEvent'

export class TaskWasDone extends DomainEvent {
  public static EVENT_NAME = 'task.done'

  public readonly phaseId: string

  constructor(id: string, phaseId: string) {
    super(id)

    this.phaseId = phaseId
  }
}
