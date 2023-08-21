import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
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

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'organization@example.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
  }
}
