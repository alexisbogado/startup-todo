import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { EventBus } from './domain/shared/EventBus'
import { DomainEvent } from './domain/shared/DomainEvent'
import { DomainEventSubscriber } from './domain/shared/DomainEventSubscriber'
import container, { registerDependencies } from './container'
import { schema } from './infrastructure/graphql/schema'

const registerDomainEventSubscribers = (): void => {
  const eventBus = container.get<EventBus>('domain.shared.EventBus')
  const subscribers = container.findTaggedServiceIds('domainEventSubscriber')
  const domainSubscribers: Array<DomainEventSubscriber<DomainEvent>> = []

  for (const subscriber of subscribers) {
    const domainSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(subscriber.id)
    domainSubscribers.push(domainSubscriber)
  }

  eventBus.registerSubscribers(domainSubscribers)
}

const startServer = async (): Promise<void> => {
  await registerDependencies()
  registerDomainEventSubscribers()

  const server = new ApolloServer(schema)

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 }
    })

    console.log(`🚀  Server ready at ${url}`)
  } catch (error) {
    console.log(error)
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
startServer()
