import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetPetProfileUseCase } from './get-pet-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetProfileUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetProfileUseCase(petsRepository)
  })

  it('should be able to get pet profile', async () => {
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

    const createdPet = await petsRepository.create({
      org_id: org.id,
      name: 'Scooby Doo',
      about: 'I am a dog',
      age: 'puppy',
      size: 'large',
      energy_level: 'low',
      independence_level: 'low',
      best_environment: 'wide environment',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.name).toEqual('Scooby Doo')
  })

  it('should not be able to get pet profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existent-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
