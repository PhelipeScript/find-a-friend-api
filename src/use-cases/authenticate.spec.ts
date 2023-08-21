import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
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
      email: 'org.test@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'org.test@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
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

    await expect(() =>
      sut.execute({
        email: 'org.test@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
