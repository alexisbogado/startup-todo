import { GetPhasesQueryHandler } from '../../application/query/GetPhases'
import { GetTasksByPhaseIdQueryHandler } from '../../application/query/GetTasksByPhaseId'
import { CompleteTaskCommandHandler } from '../../application/command/CompleteTask'
import container from '../../container'

// TODO: each type should be extracted to its own file with the corresponding query/mutation
const typeDefs = `#graphql
  type Query {
    phases: [Phase]
  }

  type Mutation {
    completeTask(id: ID!): Task
  }

  type Phase {
    id: ID!
    name: String!
    status: String!
    tasks: [Task]
  }

  type Task {
    id: ID!
    title: String!
    isDone: Boolean!
  }
`

// TODO: each resolver should be extracted to its own file
const resolvers = {
  Query: {
    phases: async () => {
      const phasesQuery = container.get<GetPhasesQueryHandler>('application.query.GetPhasesQueryHandler')
      return await phasesQuery.handle()
    }
  },
  Phase: {
    tasks: async ({ id }: { id: string }) => {
      // TODO: Implement a data loader to avoid N+1 queries
      const tasksQuery = container.get<GetTasksByPhaseIdQueryHandler>('application.query.GetTasksByPhaseIdQueryHandler')

      return await tasksQuery.handle({ phaseId: id })
    }
  },
  Mutation: {
    completeTask: async (_: unknown, args: { id: string }) => {
      const completeTaskCommand = container.get<CompleteTaskCommandHandler>('application.command.CompleteTaskCommandHandler')

      return await completeTaskCommand.handle({ id: args.id })
    }
  }
}

export const schema = {
  typeDefs,
  resolvers
}
