import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
    age: z.enum(['puppy', 'adult', 'mature', 'senior']).optional(),
    size: z.enum(['small', 'medium', 'large', 'giant']).optional(),
    energyLevel: z.enum(['low', 'medium', 'high']).optional(),
    independenceLevel: z.enum(['low', 'medium', 'high']).optional(),
  })

  const { city, page, age, size, energyLevel, independenceLevel } =
    fetchPetsQuerySchema.parse(request.query)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({
    city,
    page,
    age,
    size,
    energyLevel,
    independenceLevel,
  })

  return reply.status(200).send({
    pets,
  })
}
