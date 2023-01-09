import { DomainEvent } from './DomainEvent'

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = []

  public recordThat(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent)
  }

  public pullDomainEvents(): DomainEvent[] {
    const domainEvents = this.domainEvents

    this.domainEvents = []

    return domainEvents
  }
}
