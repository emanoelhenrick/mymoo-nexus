import 'dotenv/config'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { saveDevice } from '../../../services/devices/save-device'

interface QueryParams {
  deviceId: string
  key: string
}

const API_KEY = process.env.API_KEY

export async function saveDeviceController (req: FastifyRequest, res: FastifyReply) {
  const queryParams = req.query as unknown as QueryParams
  if (!queryParams.deviceId) return res.status(404).send('error: device id is null')
  if (queryParams.key !== API_KEY) return res.status(403).send('invalid api key')
  await saveDevice(queryParams.deviceId)
  res.status(201).send()
}
