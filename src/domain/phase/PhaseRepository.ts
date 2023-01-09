import { Phase } from './Phase'
import { PhaseId } from './PhaseId'

export interface PhaseRepository {
  /**
   * @throws {PhaseNotFoundException}
   */
  findById: (id: PhaseId) => Promise<Phase>

  findNextPhase: (id: PhaseId) => Promise<Phase | null>

  findAll: () => Promise<Phase[]>

  save: (phase: Phase) => Promise<void>
}
