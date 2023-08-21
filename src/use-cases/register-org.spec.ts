import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { RegisterOrgUseCase } from './register-org'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrgUseCase

describe('Register Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrgUseCase(orgsRepository)
  })

  it('should be able to register an org', async () => {
    const { org } = await sut.execute({
      name: 'Org Test',
      email: 'org.test@example.com',
      password: '123456',
      street: 'Rua ABC',
      streetNumber: '123',
      complement: null,
      neighborhood: 'lindo',
      zipCode: '0000000',
      city: 'São Paulo',
      uf: 'SP',
      country: 'Brazil',
      phone: '1199999999',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash org password upon registration', async () => {
    const { org } = await sut.execute({
      name: 'Org Test',
      email: 'org.test@example.com',
      password: '123456',
      street: 'Rua ABC',
      streetNumber: '123',
      complement: null,
      neighborhood: 'lindo',
      zipCode: '0000000',
      city: 'São Paulo',
      uf: 'SP',
      country: 'Brazil',
      phone: '1199999999',
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register an org twice with same email', async () => {
    const email = 'org.test@example.com'

    await sut.execute({
      name: 'Org Test',
      email,
      password: '123456',
      street: 'Rua ABC',
      streetNumber: '123',
      complement: null,
      neighborhood: 'lindo',
      zipCode: '0000000',
      city: 'São Paulo',
      uf: 'SP',
      country: 'Brazil',
      phone: '1199999999',
    })

    await expect(() =>
      sut.execute({
        name: 'Org Test With Same Email',
        email,
        password: '123456',
        street: 'Rua wyz',
        streetNumber: '321',
        complement: null,
        neighborhood: 'feio',
        zipCode: '0000000',
        city: 'São Paulo',
        uf: 'SP',
        country: 'Brazil',
        phone: '1199999999',
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
