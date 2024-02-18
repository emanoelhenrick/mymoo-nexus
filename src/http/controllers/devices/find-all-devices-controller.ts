import 'dotenv/config'
import { type FastifyReply, type FastifyRequest } from 'fastify'
import { findAllDevices } from '../../../services/devices/find-all-devices'

interface QueryParams {
  page: number
  key: string
}

const API_KEY = process.env.API_KEY

export async function findAllDevicesController (req: FastifyRequest, res: FastifyReply) {
  const queryParams = req.query as unknown as QueryParams
  if (queryParams.key !== API_KEY) return res.status(403).send('invalid api key')
  const page = queryParams.page ? queryParams.page : 1
  const devices = await findAllDevices(page)
  res.status(200).send(devices)
}
