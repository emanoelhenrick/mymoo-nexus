import fastify from 'fastify'
import { discoverRoute } from './http/controllers/discover/routes'
import InMemoryTempDevicesRepository from './repositories/devices/memory-temp-devices-repository'
import { findAllTempDevicesRoute } from './http/controllers/temp-devices/route'
import { devicesRoute } from './http/controllers/devices/route'
import cors from '@fastify/cors'

export const tempDB = InMemoryTempDevicesRepository.getInstance()

export const app = fastify()

app.register(cors, { origin: '*' })
app.register(discoverRoute)
app.register(findAllTempDevicesRoute)
app.register(devicesRoute)
