import 'dotenv/config'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { updateDevice } from '../../../services/devices/update-device'
import { findDeviceById } from '../../../services/devices/find-device-by-id'

interface QueryParams {
  deviceId: string
  key: string
}

const API_KEY = process.env.API_KEY

export async function updateDeviceController (req: FastifyRequest, res: FastifyReply) {
  const queryParams = req.query as unknown as QueryParams
  if (!queryParams.deviceId) return res.status(404).send('error: device id is null')
  if (queryParams.key !== API_KEY) return res.status(401).send('invalid api key')
  const device = await findDeviceById(queryParams.deviceId)
  if (!device) return res.status(401).send()
  await updateDevice(queryParams.deviceId)
  res.status(200).send()
}
