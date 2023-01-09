import { PhaseName } from './PhaseName'

export class PhaseIsNotBlockedException extends Error {
  constructor(name: PhaseName) {
    super(`Phase "${name.value}" is not blocked`)
  }
}
