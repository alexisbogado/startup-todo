import { TaskRepository } from '../../domain/task/TaskRepository'
import { PhaseRepository } from '../../domain/phase/PhaseRepository'
import { TaskId } from '../../domain/task/TaskId'
import { PhaseIsNotActiveException } from '../../domain/phase/PhaseIsNotActiveException'
import { EventBus } from '../../domain/shared/EventBus'

export interface CompleteTaskCommand {
  id: string
}

interface CompletedTaskResponse {
  id: string
  title: string
  isDone: boolean
}

export class CompleteTaskCommandHandler {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly phaseRepository: PhaseRepository,
    private readonly eventBus: EventBus
  ) {}

  async handle(command: CompleteTaskCommand): Promise<CompletedTaskResponse> {
    const taskId = new TaskId(command.id)
    const task = await this.taskRepository.findById(taskId)
    const phase = await this.phaseRepository.findById(task.phaseId)

    if (!phase.status.isActive()) {
      throw new PhaseIsNotActiveException(phase.name)
    }

    task.markAsDone()

    await this.taskRepository.save(task)
    await this.eventBus.publish(task.pullDomainEvents())

    return {
      id: task.id.value,
      title: task.title.value,
      isDone: task.isDone
    }
  }
}
