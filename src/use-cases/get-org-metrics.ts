import { PetsRepository } from '@/repositories/pets-repository'

interface GetOrgMetricsUseCaseRequest {
  orgId: string
}

interface GetOrgMetricsUseCaseResponse {
  petsCount: number
}

export class GetOrgMetricsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgId,
  }: GetOrgMetricsUseCaseRequest): Promise<GetOrgMetricsUseCaseResponse> {
    const petsCount = await this.petsRepository.countByOrgId(orgId)

    return {
      petsCount,
    }
  }
}
