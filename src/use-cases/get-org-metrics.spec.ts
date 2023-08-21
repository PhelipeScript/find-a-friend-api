import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgMetricsUseCase } from './get-org-metrics'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetOrgMetricsUseCase

describe('Get Org Metrics Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetOrgMetricsUseCase(petsRepository)
  })

  it('should be able to get pets count from metrics', async () => {
    const org = await orgsRepository.create({
      name: 'Org Test',
      email: 'org.test@example.com',
      password_hash: await hash('123456', 6),
      street: 'Rua ABC',
      street_number: '123',
      complement: null,
      neighborhood: 'lindo',
      zip_code: '0000000',
      city: 'São Paulo',
      uf: 'SP',
      country: 'Brazil',
      phone: '1199999999',
    })

    await petsRepository.create({
      org_id: org.id,
      name: 'Scooby Doo',
      about: 'I am a large dog',
      age: 'senior',
      size: 'large',
      energy_level: 'low',
      independence_level: 'low',
      best_environment: 'wide environment',
    })

    await petsRepository.create({
      org_id: org.id,
      name: 'Scrappy-Doo',
      about: 'I am a small dog',
      age: 'puppy',
      size: 'large',
      energy_level: 'low',
      independence_level: 'low',
      best_environment: 'wide environment',
    })

    const { petsCount } = await sut.execute({ orgId: org.id })

    expect(petsCount).toEqual(2)
  })
})
