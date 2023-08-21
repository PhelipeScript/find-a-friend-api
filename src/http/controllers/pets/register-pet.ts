import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerPetBodySchema = z.object({
    orgId: z.string(),
    name: z.string(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energyLevel: z.string(),
    independenceLevel: z.string(),
    bestEnvironment: z.string(),
    imagesUrl: z.string(),
    adoptionRequirement: z.string(),
  })

  const {
    orgId,
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    bestEnvironment,
    imagesUrl,
    adoptionRequirement,
  } = registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    orgId,
    name,
    about,
    age,
    size,
    energyLevel,
    independenceLevel,
    bestEnvironment,
    imagesUrl,
    adoptionRequirement,
  })

  return reply.status(201).send()
}
