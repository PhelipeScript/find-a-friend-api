import { FastifyInstance } from 'fastify'

import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { registerOrg } from './register-org'
import { authenticate } from './authenticate'
import { orgProfile } from './org-profile'
import { metrics } from './metrics'
import { refresh } from './refresh'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', registerOrg)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  app.get('/my-org', { onRequest: [verifyJWT] }, orgProfile)
  app.get('/orgs/metrics', { onRequest: [verifyJWT] }, metrics)
}
