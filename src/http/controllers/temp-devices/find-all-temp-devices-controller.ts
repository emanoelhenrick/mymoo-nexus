import 'dotenv/config'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { findAllTempDevices } from '../../../services/devices/find-all-temp-devices'

interface QueryParams {
  key: string
}

const API_KEY = process.env.API_KEY

export async function findAllTempDevicesController (req: FastifyRequest, res: FastifyReply) {
  const queryParams = req.query as unknown as QueryParams
  if (queryParams.key !== API_KEY) return res.status(403).send('invalid api key')
  const tempDevices = await findAllTempDevices()
  res.status(200).send(tempDevices)
}
