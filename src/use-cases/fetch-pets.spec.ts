import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { FetchPetsUseCase } from './fetch-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  let org

  beforeEach(async () => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository, orgsRepository)

    org = await orgsRepository.create({
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
      about: 'I am a dog',
      age: 'puppy',
      size: 'large',
      energy_level: 'low',
      independence_level: 'low',
      best_environment: 'wide environment',
    })

    await petsRepository.create({
      org_id: org.id,
      name: 'Coragem',
      about: 'I am a cat',
      age: 'senior',
      size: 'small',
      energy_level: 'high',
      independence_level: 'high',
      best_environment: 'wide environment',
    })
  })

  it('should be able to fetch pets by city', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Scooby Doo',
        about: 'I am a dog',
      }),
      expect.objectContaining({
        name: 'Coragem',
        about: 'I am a cat',
      }),
    ])
  })

  it('should be able to fetch pets by characteristic', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'puppy',
      page: 1,
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Scooby Doo',
        about: 'I am a dog',
      }),
    ])
  })

  it('should be able to fetch paginated pets', async () => {
    const orgRJ = await orgsRepository.create({
      name: 'Org Test 2',
      email: 'org.test2@example.com',
      password_hash: await hash('1234567', 6),
      street: 'Rua ABC',
      street_number: '123',
      complement: null,
      neighborhood: 'lindo',
      zip_code: '0000000',
      city: 'Rio de Janeiro',
      uf: 'RJ',
      country: 'Brazil',
      phone: '1199999999',
    })

    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        org_id: orgRJ.id,
        name: `Dog ${i}`,
        about: 'I am a dog',
        age: 'senior',
        size: 'small',
        energy_level: 'high',
        independence_level: 'high',
        best_environment: 'wide environment',
      })
    }

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      page: 2,
    })

    expect(pets.length).toEqual(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Dog 21',
        about: 'I am a dog',
      }),
      expect.objectContaining({
        name: 'Dog 22',
        about: 'I am a dog',
      }),
    ])
  })
})
