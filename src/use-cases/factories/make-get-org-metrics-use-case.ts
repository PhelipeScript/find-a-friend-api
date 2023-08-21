import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetOrgMetricsUseCase } from '../get-org-metrics'

export function makeGetOrgMetricsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new GetOrgMetricsUseCase(petsRepository)

  return useCase
}
