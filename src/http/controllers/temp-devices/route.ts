import { type FastifyInstance } from 'fastify'
import { findAllTempDevicesController } from './find-all-temp-devices-controller'

export async function findAllTempDevicesRoute (app: FastifyInstance) {
  app.get('/temp-devices', findAllTempDevicesController)
}
