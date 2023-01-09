import { AggregateRoot } from '../../../src/domain/shared/AggregateRoot'
import { Task } from '../../../src/domain/task/Task'
import { TaskId } from '../../../src/domain/task/TaskId'
import { PhaseId } from '../../../src/domain/phase/PhaseId'
import { TaskTitle } from '../../../src/domain/task/TaskTitle'
import { TaskIsAlreadyMarkedAsDoneException } from '../../../src/domain/task/TaskIsAlreadyMarkedAsDoneException'

beforeAll(() => {
  jest.spyOn(AggregateRoot.prototype, 'recordThat')
    .mockImplementation(jest.fn())
})

it('task cannot be completed if it is already completed', () => {
  const task = new Task(TaskId.generate(), PhaseId.generate(), new TaskTitle('Test task'), true)

  expect(() => { task.markAsDone() }).toThrow(TaskIsAlreadyMarkedAsDoneException)
})

it('should set status as completed and record a domain event', () => {
  const taskId = TaskId.generate()
  const phaseId = PhaseId.generate()
  const title = new TaskTitle('Test task')
  const task = new Task(taskId, phaseId, title, false)

  task.markAsDone()

  expect(task.isDone).toBe(true)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(task.recordThat).toHaveBeenCalledTimes(1)
})
