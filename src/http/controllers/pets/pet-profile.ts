import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetProfileUseCase } from '@/use-cases/factories/make-get-pet-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function petProfile(request: FastifyRequest, reply: FastifyReply) {
  const petProfileParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = petProfileParamsSchema.parse(request.params)

  const petProfileUseCase = makeGetPetProfileUseCase()

  try {
    const { pet } = await petProfileUseCase.execute({
      petId: id,
    })

    return reply.status(200).send({
      pet,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
