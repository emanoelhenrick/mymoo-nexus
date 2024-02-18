import { deviceDB } from '../../repositories/devices/prisma-devices-repository'

export async function findAllDevices (page: number) {
  return await deviceDB.findMany(page)
}
