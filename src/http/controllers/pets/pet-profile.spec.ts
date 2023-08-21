import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Pet Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet profile', async () => {
    await createAndAuthenticateOrg(app)

    const org = await prisma.org.findFirstOrThrow()

    const pet = await prisma.pet.create({
      data: {
        org_id: org.id,
        name: 'Scooby Doo',
        about: 'I am a dog',
        age: 'puppy',
        size: 'large',
        energy_level: 'low',
        independence_level: 'low',
        best_environment: 'wide environment',
      },
    })

    const response = await request(app.server).get(`/pets/${pet.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Scooby Doo',
        about: 'I am a dog',
      }),
    )
  })
})
