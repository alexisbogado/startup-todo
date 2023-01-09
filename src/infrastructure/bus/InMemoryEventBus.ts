import { EventBus } from '../../domain/shared/EventBus'
import { DomainEvent } from '../../domain/shared/DomainEvent'
import { DomainEventSubscriber } from '../../domain/shared/DomainEventSubscriber'
import EventEmitter from 'events'

export class InMemoryEventBus extends EventEmitter implements EventBus {
  private readonly handlers: Map<string, Array<DomainEventSubscriber<DomainEvent>>> = new Map()
  public async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      const handlers = this.handlers.get(event.eventName()) ?? []

      for (const handler of handlers) {
        await handler.handle(event)
      }
    }
  }

  public registerSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    subscribers.forEach(subscriber => {
      const subscribedTo = subscriber.subscribedTo()
      const eventName = subscribedTo.EVENT_NAME

      if (!this.handlers.has(eventName)) {
        this.handlers.set(eventName, [])
      }

      this.handlers.get(eventName)?.push(subscriber)
    })
  }
}
