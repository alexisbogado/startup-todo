import { TaskRepository } from '../../domain/task/TaskRepository'
import { TaskId } from '../../domain/task/TaskId'
import { Task } from '../../domain/task/Task'
import { tasks } from '../../db'
import { TaskNotFoundException } from '../../domain/task/TaskNotFoundException'
import { PhaseId } from '../../domain/phase/PhaseId'
import { TaskTitle } from '../../domain/task/TaskTitle'

export class InMemoryTaskRepository implements TaskRepository {
  async findById(id: TaskId): Promise<Task> {
    const task = await Promise.resolve(tasks.find(task => task.id === id.value))

    if (task === undefined) {
      throw new TaskNotFoundException(id)
    }

    return new Task(
      new TaskId(task.id),
      new PhaseId(task.phaseId),
      new TaskTitle(task.title),
      task.isDone
    )
  }

  async findByPhaseId(phaseId: PhaseId): Promise<Task[]> {
    const tasksByPhase = await Promise.resolve(tasks.filter(task => task.phaseId === phaseId.value))

    return tasksByPhase.map(
      task => new Task(
        new TaskId(task.id),
        new PhaseId(task.phaseId),
        new TaskTitle(task.title),
        task.isDone
      )
    )
  }

  async save(domainTask: Task): Promise<void> {
    const index = await Promise.resolve(tasks.findIndex(task => task.id === domainTask.id.value))
    const task = {
      id: domainTask.id.value,
      phaseId: domainTask.phaseId.value,
      title: domainTask.title.value,
      isDone: domainTask.isDone
    }

    if (index === -1) tasks.push(task)
    else tasks[index] = task
  }
}
