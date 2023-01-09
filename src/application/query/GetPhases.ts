
import { PhaseRepository } from '../../domain/phase/PhaseRepository'

interface PhaseResponse {
  id: string
  name: string
  status: string
}

export class GetPhasesQueryHandler {
  constructor(private readonly repository: PhaseRepository) { }

  async handle(): Promise<PhaseResponse[]> {
    // TODO: This can be taken from a projection, read repository, db context, etc.
    const phases = await this.repository.findAll()

    return phases.map(phase => ({
      id: phase.id.value,
      name: phase.name.value,
      status: phase.status.value
    }))
  }
}
