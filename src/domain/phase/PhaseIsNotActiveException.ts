import { PhaseName } from './PhaseName'

export class PhaseIsNotActiveException extends Error {
  constructor(name: PhaseName) {
    super(`Phase "${name.value}" is not active`)
  }
}
