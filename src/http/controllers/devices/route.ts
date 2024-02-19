import { type FastifyInstance } from 'fastify'
import { updateDeviceController } from './update-device-controller'
import { findAllDevicesController } from './find-all-devices-controller'
import { removeDeviceController } from './remove-device-controller'
import { saveDeviceController } from './save-device-controller'

export async function devicesRoute (app: FastifyInstance) {
  app.post('/devices', saveDeviceController)
  app.get('/devices', findAllDevicesController)
  app.delete('/devices', removeDeviceController)
  app.get('/devices/ping', updateDeviceController)
}
