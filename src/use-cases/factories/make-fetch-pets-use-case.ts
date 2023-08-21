import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { FetchPetsUseCase } from '../fetch-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new FetchPetsUseCase(petsRepository, orgsRepository)

  return useCase
}
