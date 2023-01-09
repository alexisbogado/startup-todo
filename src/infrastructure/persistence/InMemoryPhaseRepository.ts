import { PhaseId } from '../../domain/phase/PhaseId'
import { PhaseRepository } from '../../domain/phase/PhaseRepository'
import { Phase } from '../../domain/phase/Phase'
import { phases } from '../../db'
import { PhaseName } from '../../domain/phase/PhaseName'
import { PhaseStatus } from '../../domain/phase/PhaseStatus'
import { PhaseNotFoundException } from '../../domain/phase/PhaseNotFoundException'

export class InMemoryPhaseRepository implements PhaseRepository {
  async findById(id: PhaseId): Promise<Phase> {
    const phase = await Promise.resolve(phases.find(phase => phase.id === id.value))

    if (phase === undefined) {
      throw new PhaseNotFoundException(id)
    }

    return new Phase(
      new PhaseId(phase.id),
      new PhaseName(phase.name),
      PhaseStatus.fromString(phase.status)
    )
  }

  async findNextPhase(id: PhaseId): Promise<Phase | null> {
    const index = await Promise.resolve(phases.findIndex(phase => phase.id === id.value))

    if (index === -1 || index === phases.length - 1) {
      return null
    }

    const nextId = new PhaseId(phases[index + 1].id)

    return await this.findById(nextId)
  }

  async findAll(): Promise<Phase[]> {
    return await Promise.resolve(phases.map(
      phase => new Phase(
        new PhaseId(phase.id),
        new PhaseName(phase.name),
        PhaseStatus.fromString(phase.status)
      )
    ))
  }

  async save(domainPhase: Phase): Promise<void> {
    const index = await Promise.resolve(phases.findIndex(phase => phase.id === domainPhase.id.value))
    const phase = {
      id: domainPhase.id.value,
      name: domainPhase.name.value,
      status: domainPhase.status.value
    }

    if (index === -1) phases.push(phase)
    else phases[index] = phase
  }
}
