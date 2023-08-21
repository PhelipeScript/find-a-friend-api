import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
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

    expect(response.statusCode).toEqual(201)
  })
})
