import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetOrgMetricsUseCase } from '@/use-cases/factories/make-get-org-metrics-use-case'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const getOrgMetricsUseCase = makeGetOrgMetricsUseCase()

  const { petsCount } = await getOrgMetricsUseCase.execute({
    orgId: request.user.sub,
  })

  return reply.status(200).send({
    petsCount,
  })
}
