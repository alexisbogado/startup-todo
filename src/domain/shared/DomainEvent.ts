export abstract class DomainEvent {
  public static EVENT_NAME: string

  public readonly occurredOn: Date

  constructor(public readonly aggregateId: string) {
    this.occurredOn = new Date()
  }

  public eventName(): string {
    return (this.constructor as typeof DomainEvent).EVENT_NAME
  }
}

export interface DomainEventClass {
  EVENT_NAME: string
}
