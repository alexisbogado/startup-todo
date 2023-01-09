import { TaskId } from './TaskId'

export class TaskNotFoundException extends Error {
  constructor(id: TaskId) {
    super(`Task with id "${id.value}" not found`)
  }
}
