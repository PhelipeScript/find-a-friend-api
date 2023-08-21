import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register a pet', async () => {
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

    const { pet } = await sut.execute({
      orgId: org.id,
      name: 'Scooby Doo',
      about: 'I am a dog',
      age: 'puppy',
      size: 'large',
      energyLevel: 'low',
      independenceLevel: 'low',
      bestEnvironment: 'wide environment',
      imagesUrl:
        'https://f.i.uol.com.br/fotografia/2019/01/30/15488701855c51e2291d493_1548870185_3x2_md.jpg',
      adoptionRequirement: 'lactose intolerant',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
