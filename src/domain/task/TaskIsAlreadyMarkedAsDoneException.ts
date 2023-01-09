import { TaskTitle } from './TaskTitle'

export class TaskIsAlreadyMarkedAsDoneException extends Error {
  constructor(title: TaskTitle) {
    super(`Task "${title.value}" has already been marked as done`)
  }
}
