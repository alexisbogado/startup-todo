import { TaskRepository } from '../../domain/task/TaskRepository'
import { PhaseId } from '../../domain/phase/PhaseId'

export interface GetTasksByPhaseIdQuery {
  phaseId: string
}

interface TaskResponse {
  id: string
  title: string
  isDone: boolean
}

export class GetTasksByPhaseIdQueryHandler {
  constructor(private readonly repository: TaskRepository) { }

  async handle(query: GetTasksByPhaseIdQuery): Promise<TaskResponse[]> {
    // TODO: This can be taken from a projection, read repository, db context, etc.
    const phaseId = new PhaseId(query.phaseId)
    const tasks = await this.repository.findByPhaseId(phaseId)

    return tasks.map(task => ({
      id: task.id.value,
      title: task.title.value,
      isDone: task.isDone
    }))
  }
}
