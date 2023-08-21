import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { petProfile } from './pet-profile'
import { fetchPets } from './fetch-pets'
import { registerPet } from './register-pet'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets', fetchPets)
  app.get('/pets/:id', petProfile)

  app.post('/pets', { onRequest: [verifyJWT] }, registerPet)
}
