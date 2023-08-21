import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/orgs').send({
      name: 'Organization',
      email: 'organization@example.com',
      password: '123456',
      street: 'Rua ABC',
      streetNumber: '123',
      neighborhood: 'Lindo',
      complement: 'apt 402',
      zipCode: '00000999',
      city: 'São Paulo',
      uf: 'SP',
      country: 'Brazil',
      phone: '11999999999',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'organization@example.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
