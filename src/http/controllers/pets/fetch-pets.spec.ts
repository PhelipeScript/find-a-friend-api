import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    await prisma.pet.createMany({
      data: [
        {
          org_id: org.id,
          name: 'Scooby Doo',
          about: 'I am a dog',
          age: 'puppy',
          size: 'large',
          energy_level: 'low',
          independence_level: 'low',
          best_environment: 'wide environment',
        },
        {
          org_id: org.id,
          name: 'Garfield',
          about: 'I am a cat',
          age: 'puppy',
          size: 'large',
          energy_level: 'low',
          independence_level: 'low',
          best_environment: 'wide environment',
        },
      ],
    })

    const response = await request(app.server)
      .get('/pets')
      .query({
        city: 'São Paulo',
      })
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets.length).toEqual(2)
    expect(response.body.pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Garfield',
          about: 'I am a cat',
        }),
        expect.objectContaining({
          name: 'Scooby Doo',
          about: 'I am a dog',
        }),
      ]),
    )
  })
})
