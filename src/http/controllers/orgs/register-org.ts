import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    street: z.string(),
    streetNumber: z.string(),
    complement: z.string().nullable(),
    neighborhood: z.string(),
    zipCode: z.string(),
    city: z.string(),
    uf: z.string(),
    country: z.string(),
    phone: z.string(),
  })

  const {
    name,
    email,
    password,
    street,
    streetNumber,
    complement,
    neighborhood,
    zipCode,
    city,
    uf,
    country,
    phone,
  } = registerOrgBodySchema.parse(request.body)

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase()

    await registerOrgUseCase.execute({
      name,
      email,
      password,
      street,
      streetNumber,
      complement,
      neighborhood,
      zipCode,
      city,
      uf,
      country,
      phone,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
