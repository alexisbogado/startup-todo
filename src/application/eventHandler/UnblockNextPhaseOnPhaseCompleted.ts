import { DomainEventSubscriber } from '../../domain/shared/DomainEventSubscriber'
import { PhaseWasCompleted } from '../../domain/phase/PhaseWasCompleted'
import { PhaseRepository } from '../../domain/phase/PhaseRepository'
import { PhaseId } from '../../domain/phase/PhaseId'
import { DomainEventClass } from '../../domain/shared/DomainEvent'

export class UnblockNextPhaseOnPhaseCompleted implements DomainEventSubscriber<PhaseWasCompleted> {
  constructor(private readonly repository: PhaseRepository) { }

  public subscribedTo(): DomainEventClass {
    return PhaseWasCompleted
  }

  public async handle(domainEvent: PhaseWasCompleted): Promise<void> {
    const phaseId = new PhaseId(domainEvent.aggregateId)
    const phase = await this.repository.findNextPhase(phaseId)

    if (phase === null) {
      return
    }

    phase.unblock()

    await this.repository.save(phase)
  }
}
