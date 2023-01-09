import { DomainEvent, DomainEventClass } from './DomainEvent'

export interface DomainEventSubscriber<T extends DomainEvent> {
  subscribedTo: () => DomainEventClass
  handle: (domainEvent: T) => Promise<void>
}
