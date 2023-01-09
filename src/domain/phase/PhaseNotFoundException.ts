import { PhaseId } from './PhaseId'

export class PhaseNotFoundException extends Error {
  constructor(id: PhaseId) {
    super(`Phase with id "${id.value}" not found`)
  }
}
