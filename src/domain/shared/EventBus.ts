import { DomainEvent } from './DomainEvent'
import { DomainEventSubscriber } from './DomainEventSubscriber'

export interface EventBus {
  publish: (events: DomainEvent[]) => Promise<void>
  registerSubscribers: (subscribers: Array<DomainEventSubscriber<DomainEvent>>) => void
}
