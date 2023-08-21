import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetOrgProfileUseCase } from './get-org-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get org profile', async () => {
    const createdOrg = await orgsRepository.create({
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

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })

    expect(org.name).toEqual('Org Test')
  })

  it('should not be able to get org profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
