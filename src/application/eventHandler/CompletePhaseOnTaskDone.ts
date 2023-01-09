import { DomainEventSubscriber } from '../../domain/shared/DomainEventSubscriber'
import { TaskWasDone } from '../../domain/task/TaskWasDone'
import { TaskRepository } from '../../domain/task/TaskRepository'
import { PhaseId } from '../../domain/phase/PhaseId'
import { PhaseRepository } from '../../domain/phase/PhaseRepository'
import { EventBus } from '../../domain/shared/EventBus'
import { DomainEventClass } from '../../domain/shared/DomainEvent'

export class CompletePhaseOnTaskDone implements DomainEventSubscriber<TaskWasDone> {
  constructor(
    private readonly phaseRepository: PhaseRepository,
    private readonly taskRepository: TaskRepository,
    private readonly eventBus: EventBus
  ) { }

  public subscribedTo(): DomainEventClass {
    return TaskWasDone
  }

  public async handle(domainEvent: TaskWasDone): Promise<void> {
    const phaseId = new PhaseId(domainEvent.phaseId)
    const tasks = await this.taskRepository.findByPhaseId(phaseId)

    const allTasksAreDone = tasks.every(task => task.isDone)

    if (!allTasksAreDone) {
      return
    }

    const phase = await this.phaseRepository.findById(phaseId)

    phase.markAsCompleted()

    await this.phaseRepository.save(phase)
    await this.eventBus.publish(phase.pullDomainEvents())
  }
}
