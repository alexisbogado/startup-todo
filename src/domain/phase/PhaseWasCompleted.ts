import { DomainEvent } from '../shared/DomainEvent'

export class PhaseWasCompleted extends DomainEvent {
  public static EVENT_NAME = 'phase.completed'
}
