import { Task } from './Task'
import { TaskId } from './TaskId'
import { PhaseId } from '../phase/PhaseId'

export interface TaskRepository {
  /**
   * @throws {TaskNotFoundException}
   */
  findById: (id: TaskId) => Promise<Task>

  findByPhaseId: (phaseId: PhaseId) => Promise<Task[]>

  save: (task: Task) => Promise<void>
}
