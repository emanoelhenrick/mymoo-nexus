import { type FastifyInstance } from 'fastify'
import { discoverController } from './discover-controller'

export async function discoverRoute (app: FastifyInstance) {
  app.get('/discover', discoverController)
}
